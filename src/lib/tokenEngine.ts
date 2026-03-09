// ==============================
// TOKENIZA — Token Engine Module
// Cálculos de tokenización, distribución, compliance y proyecciones
// ==============================

// --- Types ---

export interface TokenomicsInput {
  assetValuation: number;       // Valoración total del activo (USD)
  percentageToTokenize: number; // Porcentaje a tokenizar (1-100)
  desiredTokenPrice?: number;   // Precio deseado por token (opcional)
  totalTokensOverride?: number; // Override manual de tokens totales
}

export interface TokenomicsOutput {
  totalTokens: number;
  tokenPrice: number;
  emissionAmount: number;
  marketCap: number;
  supply: number;
}

export interface TokenConfig {
  assetType: string;
  tokenName: string;
  tokenSymbol: string;
  standard: 'ERC-20' | 'ERC-1400' | 'ERC-3643';
  blockchain: string;
  totalSupply: number;
  decimals: number;
  compliance: {
    kycRequired: boolean;
    allowedCountries: string[];
    lockupPeriodDays: number;
    transferable: boolean;
    whitelistEnabled: boolean;
  };
  distribution: {
    investorsPercent: number;
    issuerPercent: number;
    reservePercent: number;
    platformPercent: number;
    frequency: 'mensual' | 'trimestral' | 'semestral' | 'anual';
    method: 'automatic' | 'manual';
  };
}

export interface DistributionInput {
  periodRevenue: number;
  rules: {
    investorsPercent: number;
    issuerPercent: number;
    reservePercent: number;
    platformPercent: number;
  };
  totalTokens: number;
  holdersCount: number;
  tokenDistribution?: { address: string; tokens: number }[];
}

export interface DistributionOutput {
  totalToDistribute: number;
  amountPerToken: number;
  breakdown: {
    investors: number;
    issuer: number;
    reserve: number;
    platform: number;
  };
  perHolder: { address: string; tokens: number; amount: number }[];
}

export interface ProjectionInput {
  assetPrice: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  annualAppreciation: number; // as percentage e.g. 3 = 3%
  tokenPrice: number;
  totalTokens: number;
}

export interface ProjectionOutput {
  netAnnualYield: number;
  projections: {
    year: number;
    assetValue: number;
    accumulatedIncome: number;
    accumulatedExpenses: number;
    netReturn: number;
    netReturnPercent: number;
    tokenValue: number;
  }[];
}

export interface ComplianceInput {
  issuerCountry: string;
  investorCountry: string;
  assetType: string;
  investmentAmount: number;
}

export interface ComplianceOutput {
  allowed: boolean;
  requirements: string[];
  warnings: string[];
}

export interface GasEstimate {
  blockchain: string;
  standard: string;
  estimatedGasUSD: number;
  estimatedTimeMinutes: number;
}

// --- Functions ---

/**
 * Calcula la tokenomics de una emisión.
 */
export function calculateTokenomics(params: TokenomicsInput): TokenomicsOutput {
  const { assetValuation, percentageToTokenize, desiredTokenPrice, totalTokensOverride } = params;

  const emissionAmount = assetValuation * (percentageToTokenize / 100);

  let totalTokens: number;
  let tokenPrice: number;

  if (totalTokensOverride && totalTokensOverride > 0) {
    totalTokens = totalTokensOverride;
    tokenPrice = emissionAmount / totalTokens;
  } else if (desiredTokenPrice && desiredTokenPrice > 0) {
    tokenPrice = desiredTokenPrice;
    totalTokens = Math.floor(emissionAmount / tokenPrice);
  } else {
    // Default: tokens at $10 each
    tokenPrice = 10;
    totalTokens = Math.floor(emissionAmount / tokenPrice);
  }

  return {
    totalTokens,
    tokenPrice: Math.round(tokenPrice * 100) / 100,
    emissionAmount: Math.round(emissionAmount * 100) / 100,
    marketCap: Math.round(totalTokens * tokenPrice * 100) / 100,
    supply: totalTokens,
  };
}

/**
 * Genera la configuración del token para smart contract.
 */
export function generateTokenConfig(params: {
  assetType: string;
  tokenName: string;
  tokenSymbol: string;
  standard: 'ERC-20' | 'ERC-1400' | 'ERC-3643';
  blockchain: string;
  totalSupply: number;
  compliance: TokenConfig['compliance'];
  distribution: TokenConfig['distribution'];
}): TokenConfig {
  return {
    assetType: params.assetType,
    tokenName: params.tokenName,
    tokenSymbol: params.tokenSymbol,
    standard: params.standard,
    blockchain: params.blockchain,
    totalSupply: params.totalSupply,
    decimals: 18,
    compliance: { ...params.compliance },
    distribution: { ...params.distribution },
  };
}

/**
 * Simula la distribución de rendimientos de un periodo.
 */
export function simulateDistribution(params: DistributionInput): DistributionOutput {
  const { periodRevenue, rules, totalTokens, holdersCount, tokenDistribution } = params;

  const investorsAmount = periodRevenue * (rules.investorsPercent / 100);
  const issuerAmount = periodRevenue * (rules.issuerPercent / 100);
  const reserveAmount = periodRevenue * (rules.reservePercent / 100);
  const platformAmount = periodRevenue * (rules.platformPercent / 100);

  const amountPerToken = totalTokens > 0 ? investorsAmount / totalTokens : 0;

  // If we have detailed holder distribution
  let perHolder: DistributionOutput['perHolder'] = [];
  if (tokenDistribution && tokenDistribution.length > 0) {
    perHolder = tokenDistribution.map((h) => ({
      address: h.address,
      tokens: h.tokens,
      amount: Math.round(h.tokens * amountPerToken * 100) / 100,
    }));
  } else {
    // Equal distribution simulation
    const tokensPerHolder = totalTokens / Math.max(holdersCount, 1);
    perHolder = Array.from({ length: holdersCount }, (_, i) => ({
      address: `0x...holder${i + 1}`,
      tokens: Math.round(tokensPerHolder),
      amount: Math.round(tokensPerHolder * amountPerToken * 100) / 100,
    }));
  }

  return {
    totalToDistribute: Math.round(periodRevenue * 100) / 100,
    amountPerToken: Math.round(amountPerToken * 10000) / 10000,
    breakdown: {
      investors: Math.round(investorsAmount * 100) / 100,
      issuer: Math.round(issuerAmount * 100) / 100,
      reserve: Math.round(reserveAmount * 100) / 100,
      platform: Math.round(platformAmount * 100) / 100,
    },
    perHolder,
  };
}

/**
 * Calcula proyecciones de retorno a 1, 3, 5 y 10 años.
 */
export function calculateProjectedReturns(params: ProjectionInput): ProjectionOutput {
  const { assetPrice, monthlyIncome, monthlyExpenses, annualAppreciation, tokenPrice, totalTokens } = params;

  const netMonthly = monthlyIncome - monthlyExpenses;
  const netAnnual = netMonthly * 12;
  const netAnnualYield = assetPrice > 0 ? (netAnnual / assetPrice) * 100 : 0;

  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const projections = years.map((year) => {
    const appreciationFactor = Math.pow(1 + annualAppreciation / 100, year);
    const assetValue = assetPrice * appreciationFactor;
    const accumulatedIncome = monthlyIncome * 12 * year;
    const accumulatedExpenses = monthlyExpenses * 12 * year;
    const netReturn = (accumulatedIncome - accumulatedExpenses) + (assetValue - assetPrice);
    const netReturnPercent = assetPrice > 0 ? (netReturn / assetPrice) * 100 : 0;
    const tokenValue = totalTokens > 0 ? assetValue / totalTokens : tokenPrice;

    return {
      year,
      assetValue: Math.round(assetValue),
      accumulatedIncome: Math.round(accumulatedIncome),
      accumulatedExpenses: Math.round(accumulatedExpenses),
      netReturn: Math.round(netReturn),
      netReturnPercent: Math.round(netReturnPercent * 100) / 100,
      tokenValue: Math.round(tokenValue * 100) / 100,
    };
  });

  return {
    netAnnualYield: Math.round(netAnnualYield * 100) / 100,
    projections,
  };
}

/**
 * Verifica compliance según país del emisor, inversor, tipo de activo y monto.
 */
export function complianceCheck(params: ComplianceInput): ComplianceOutput {
  const { issuerCountry, investorCountry, assetType, investmentAmount } = params;
  const requirements: string[] = [];
  const warnings: string[] = [];
  let allowed = true;

  // Sanctioned countries (simplified)
  const sanctionedCountries = ['KP', 'IR', 'SY', 'CU'];
  if (sanctionedCountries.includes(investorCountry) || sanctionedCountries.includes(issuerCountry)) {
    allowed = false;
    warnings.push('País incluido en lista de sanciones internacionales');
  }

  // KYC always required
  requirements.push('Verificación KYC/AML del inversor obligatoria');

  // Country-specific rules
  if (investorCountry === 'US') {
    requirements.push('Debe cumplir con Regulation D (506b/506c) o Regulation A+');
    requirements.push('Solo inversores acreditados para Reg D 506c');
    if (investmentAmount > 10000) {
      requirements.push('Reporte obligatorio a FinCEN para montos > $10,000');
    }
  }

  if (investorCountry === 'MX' || issuerCountry === 'MX') {
    requirements.push('Cumplimiento con Ley Fintech de México');
    requirements.push('Registro ante CNBV si aplica');
    if (investmentAmount > 200000) {
      warnings.push('Montos mayores a $200,000 MXN requieren documentación adicional');
    }
  }

  if (['ES', 'DE', 'FR', 'IT', 'PT'].includes(investorCountry)) {
    requirements.push('Cumplimiento con MiCA (Markets in Crypto-Assets Regulation)');
    requirements.push('Prospecto aprobado por regulador nacional o pasaportado');
  }

  if (['CO', 'AR', 'CL', 'PE', 'BR'].includes(investorCountry)) {
    requirements.push('Verificar regulación local de valores tokenizados');
    warnings.push('Marco regulatorio en desarrollo — consultar asesor legal local');
  }

  // Asset-type-specific
  if (assetType === 'real_estate' || assetType === 'inmueble') {
    requirements.push('Escritura o título de propiedad notariado');
    requirements.push('Avalúo independiente certificado');
    requirements.push('Seguro del inmueble vigente');
  } else if (assetType === 'commodity') {
    requirements.push('Certificado de almacenamiento y custodia');
    requirements.push('Certificación de calidad/pureza');
  } else if (assetType === 'art') {
    requirements.push('Certificado de autenticidad');
    requirements.push('Valuación por perito certificado');
  } else if (assetType === 'debt' || assetType === 'bond') {
    requirements.push('Prospecto de emisión de deuda');
    requirements.push('Calificación crediticia del emisor');
  } else if (assetType === 'equity') {
    requirements.push('Acta constitutiva de la sociedad');
    requirements.push('Estados financieros auditados');
  }

  return { allowed, requirements, warnings };
}

/**
 * Estima el costo de gas para deployar un contrato.
 */
export function estimateGasCost(blockchain: string, standard: string): GasEstimate {
  // Simulated gas costs
  const gasCosts: Record<string, Record<string, { usd: number; minutes: number }>> = {
    'Ethereum': {
      'ERC-20': { usd: 45, minutes: 5 },
      'ERC-1400': { usd: 120, minutes: 8 },
      'ERC-3643': { usd: 180, minutes: 10 },
    },
    'Polygon': {
      'ERC-20': { usd: 0.5, minutes: 2 },
      'ERC-1400': { usd: 1.5, minutes: 3 },
      'ERC-3643': { usd: 2.5, minutes: 4 },
    },
    'Base': {
      'ERC-20': { usd: 0.3, minutes: 2 },
      'ERC-1400': { usd: 0.8, minutes: 3 },
      'ERC-3643': { usd: 1.2, minutes: 4 },
    },
    'Arbitrum': {
      'ERC-20': { usd: 0.4, minutes: 2 },
      'ERC-1400': { usd: 1.0, minutes: 3 },
      'ERC-3643': { usd: 1.5, minutes: 4 },
    },
  };

  const chain = gasCosts[blockchain] || gasCosts['Polygon'];
  const cost = chain[standard] || chain['ERC-20'];

  return {
    blockchain,
    standard,
    estimatedGasUSD: cost.usd,
    estimatedTimeMinutes: cost.minutes,
  };
}

// --- Asset type definitions for the wizard ---

export const ASSET_TYPES = [
  { id: 'inmueble', label: 'Inmueble', icon: 'Building2', description: 'Bienes raíces residenciales, comerciales o industriales' },
  { id: 'commodity', label: 'Commodity', icon: 'Gem', description: 'Oro, plata, petróleo y materias primas' },
  { id: 'art', label: 'Arte y Coleccionables', icon: 'Palette', description: 'Obras de arte, coleccionables y antigüedades' },
  { id: 'debt', label: 'Deuda / Bono', icon: 'FileText', description: 'Instrumentos de deuda y bonos corporativos' },
  { id: 'equity', label: 'Equity / Participación', icon: 'TrendingUp', description: 'Participación accionaria en empresas' },
  { id: 'ip', label: 'Propiedad Intelectual', icon: 'Lightbulb', description: 'Patentes, marcas y derechos de autor' },
  { id: 'sports', label: 'Derechos Deportivos', icon: 'Trophy', description: 'Derechos sobre atletas y clubes deportivos' },
  { id: 'other', label: 'Otro', icon: 'Plus', description: 'Cualquier otro activo tokenizable' },
] as const;

export type AssetTypeId = typeof ASSET_TYPES[number]['id'];

export const BLOCKCHAIN_NETWORKS = [
  { id: 'Ethereum', label: 'Ethereum', color: '#627EEA' },
  { id: 'Polygon', label: 'Polygon', color: '#8247E5' },
  { id: 'Base', label: 'Base', color: '#0052FF' },
  { id: 'Arbitrum', label: 'Arbitrum', color: '#28A0F0' },
] as const;

export const TOKEN_STANDARDS = [
  { id: 'ERC-20', label: 'ERC-20', description: 'Token fungible simple — ideal para activos básicos' },
  { id: 'ERC-1400', label: 'ERC-1400', description: 'Security Token — controles de transferencia avanzados' },
  { id: 'ERC-3643', label: 'ERC-3643', description: 'Compliance nativo — regulación integrada on-chain' },
] as const;

export const DISTRIBUTION_FREQUENCIES = [
  { id: 'mensual', label: 'Mensual' },
  { id: 'trimestral', label: 'Trimestral' },
  { id: 'semestral', label: 'Semestral' },
  { id: 'anual', label: 'Anual' },
] as const;

export const TOKEN_TYPES = [
  { id: 'revenue_share', label: 'Revenue Share' },
  { id: 'equity', label: 'Equity' },
  { id: 'debt', label: 'Debt' },
  { id: 'hybrid', label: 'Hybrid' },
] as const;

export const LEGAL_VEHICLES = [
  { id: 'spv', label: 'SPV (Special Purpose Vehicle)' },
  { id: 'llc', label: 'LLC' },
  { id: 'trust', label: 'Fideicomiso' },
  { id: 'sa', label: 'Sociedad Anónima' },
] as const;
