
-- Marketplace assets table
CREATE TABLE public.marketplace_assets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  asset_type text NOT NULL DEFAULT 'real_estate',
  category text NOT NULL DEFAULT 'inmobiliario',
  location_city text,
  location_country text,
  location_address text,
  location_lat numeric,
  location_lng numeric,
  image_url text,
  gallery_urls text[] DEFAULT '{}',
  token_symbol text NOT NULL,
  token_name text NOT NULL,
  token_price numeric NOT NULL DEFAULT 0,
  total_tokens integer NOT NULL DEFAULT 1000,
  sold_tokens integer NOT NULL DEFAULT 0,
  min_investment numeric NOT NULL DEFAULT 50,
  expected_yield numeric NOT NULL DEFAULT 0,
  distribution_frequency text DEFAULT 'mensual',
  blockchain_network text DEFAULT 'Polygon',
  contract_address text,
  status text NOT NULL DEFAULT 'active',
  risk_level text DEFAULT 'medio',
  documents_url text[] DEFAULT '{}',
  start_date timestamp with time zone DEFAULT now(),
  end_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- RLS: everyone authenticated can view active assets
ALTER TABLE public.marketplace_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active assets"
ON public.marketplace_assets
FOR SELECT
TO authenticated
USING (status = 'active');

-- Trigger for updated_at
CREATE TRIGGER update_marketplace_assets_updated_at
  BEFORE UPDATE ON public.marketplace_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
