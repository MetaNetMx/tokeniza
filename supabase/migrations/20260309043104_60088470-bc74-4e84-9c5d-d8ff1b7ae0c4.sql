
-- Tabla de tokens emitidos por emisores
CREATE TABLE public.issuer_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  issuer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Paso 1: Tipo de activo
  asset_type TEXT NOT NULL DEFAULT 'inmueble',
  
  -- Paso 2: Información del activo
  project_name TEXT NOT NULL,
  description TEXT,
  asset_details JSONB DEFAULT '{}',
  documents_url TEXT[] DEFAULT '{}',
  gallery_urls TEXT[] DEFAULT '{}',
  
  -- Paso 3: Estructura financiera
  asset_valuation NUMERIC NOT NULL DEFAULT 0,
  percentage_tokenized NUMERIC NOT NULL DEFAULT 100,
  emission_amount NUMERIC NOT NULL DEFAULT 0,
  token_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  token_price NUMERIC NOT NULL DEFAULT 10,
  total_tokens INTEGER NOT NULL DEFAULT 1000,
  sold_tokens INTEGER NOT NULL DEFAULT 0,
  min_investment NUMERIC NOT NULL DEFAULT 50,
  max_investment NUMERIC,
  estimated_yield NUMERIC NOT NULL DEFAULT 0,
  distribution_frequency TEXT NOT NULL DEFAULT 'mensual',
  token_type TEXT NOT NULL DEFAULT 'revenue_share',
  project_duration_months INTEGER DEFAULT 12,
  round_close_date TIMESTAMP WITH TIME ZONE,
  
  -- Paso 4: Configuración blockchain
  blockchain_network TEXT NOT NULL DEFAULT 'Polygon',
  token_standard TEXT NOT NULL DEFAULT 'ERC-20',
  kyc_required BOOLEAN NOT NULL DEFAULT true,
  allowed_countries TEXT[] DEFAULT '{}',
  lockup_period_days INTEGER DEFAULT 0,
  transferable BOOLEAN NOT NULL DEFAULT false,
  whitelist_enabled BOOLEAN NOT NULL DEFAULT false,
  contract_address TEXT,
  
  -- Paso 5: Compliance y legal
  jurisdiction_country TEXT,
  legal_vehicle TEXT,
  legal_documents JSONB DEFAULT '[]',
  compliance_checklist JSONB DEFAULT '[]',
  requires_legal_advisory BOOLEAN DEFAULT false,
  
  -- Paso 6: Distribución de rendimientos
  distribution_rules JSONB DEFAULT '{"investors": 70, "issuer": 15, "reserve": 10, "platform": 5}',
  distribution_method TEXT DEFAULT 'automatic',
  
  -- Estado y metadatos
  status TEXT NOT NULL DEFAULT 'draft',
  wizard_step INTEGER NOT NULL DEFAULT 1,
  submitted_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de distribuciones de rendimientos
CREATE TABLE public.token_distributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id UUID REFERENCES public.issuer_tokens(id) ON DELETE CASCADE NOT NULL,
  issuer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_revenue NUMERIC NOT NULL DEFAULT 0,
  distributed_amount NUMERIC NOT NULL DEFAULT 0,
  breakdown JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  distributed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de inversiones (relación inversor-token del emisor)
CREATE TABLE public.token_investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id UUID REFERENCES public.issuer_tokens(id) ON DELETE CASCADE NOT NULL,
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tokens_purchased INTEGER NOT NULL DEFAULT 0,
  amount_invested NUMERIC NOT NULL DEFAULT 0,
  invested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.issuer_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_investments ENABLE ROW LEVEL SECURITY;

-- RLS: Emisores ven sus propios tokens
CREATE POLICY "Issuers can manage own tokens" ON public.issuer_tokens
  FOR ALL TO authenticated
  USING (auth.uid() = issuer_id)
  WITH CHECK (auth.uid() = issuer_id);

-- RLS: Cualquiera puede ver tokens publicados
CREATE POLICY "Anyone can view published tokens" ON public.issuer_tokens
  FOR SELECT TO authenticated
  USING (status = 'published');

-- RLS: Emisores manejan sus distribuciones
CREATE POLICY "Issuers can manage own distributions" ON public.token_distributions
  FOR ALL TO authenticated
  USING (auth.uid() = issuer_id)
  WITH CHECK (auth.uid() = issuer_id);

-- RLS: Inversores ven distribuciones de tokens que poseen
CREATE POLICY "Investors can view distributions of owned tokens" ON public.token_distributions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.token_investments 
      WHERE token_investments.token_id = token_distributions.token_id 
      AND token_investments.investor_id = auth.uid()
    )
  );

-- RLS: Inversores ven sus propias inversiones
CREATE POLICY "Investors can view own investments" ON public.token_investments
  FOR SELECT TO authenticated
  USING (auth.uid() = investor_id);

-- RLS: Emisores ven inversiones en sus tokens
CREATE POLICY "Issuers can view investments in their tokens" ON public.token_investments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.issuer_tokens 
      WHERE issuer_tokens.id = token_investments.token_id 
      AND issuer_tokens.issuer_id = auth.uid()
    )
  );

-- RLS: Inversores pueden crear inversiones
CREATE POLICY "Investors can create investments" ON public.token_investments
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = investor_id);

-- Triggers para updated_at
CREATE TRIGGER update_issuer_tokens_updated_at
  BEFORE UPDATE ON public.issuer_tokens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
