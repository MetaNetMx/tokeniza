export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "mercado" | "regulacion" | "educacion" | "tecnologia" | "casos";
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}

export const categoryColors: Record<string, string> = {
  mercado: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  regulacion: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  educacion: "bg-green-500/20 text-green-400 border-green-500/30",
  tecnologia: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  casos: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export const categoryNames: Record<string, string> = {
  mercado: "Mercado",
  regulacion: "Regulación",
  educacion: "Educación",
  tecnologia: "Tecnología",
  casos: "Casos de Éxito",
};

export const blogArticles: BlogArticle[] = [
  {
    id: "tokenizacion-inmobiliaria-latam-2024",
    title: "El Auge de la Tokenización Inmobiliaria en LATAM: Tendencias 2024",
    excerpt: "Analizamos cómo la tokenización está transformando el mercado inmobiliario latinoamericano y qué oportunidades presenta para inversores.",
    content: `# El Auge de la Tokenización Inmobiliaria en LATAM

El mercado de tokenización inmobiliaria en Latinoamérica está experimentando un crecimiento sin precedentes. En 2024, hemos visto un aumento del 340% en el volumen de activos tokenizados comparado con el año anterior.

## ¿Por qué ahora?

Varios factores han convergido para crear el momento perfecto:

### 1. Madurez Regulatoria

Países como México, Brasil y Chile han desarrollado marcos regulatorios más claros que dan seguridad jurídica a emisores e inversores.

### 2. Adopción Tecnológica

La penetración de internet y smartphones en la región ha alcanzado niveles que permiten una adopción masiva de plataformas digitales de inversión.

### 3. Democratización Financiera

La tokenización permite que pequeños inversores accedan a activos que antes requerían millones de dólares, reduciendo barreras de entrada a tan solo $50-100 USD.

## Casos Destacados

### Torre Corporativa en Ciudad de México

- Valor total: $45 millones USD
- Tokens emitidos: 450,000
- Precio por token: $100 USD
- Rendimiento anual: 8.5%
- Vendido en: 72 horas

### Complejo Residencial en São Paulo

- Valor total: $30 millones BRL
- Estructura: Revenue share
- Inversores: +2,000 de 15 países
- Distribución: Mensual

## Perspectivas para el Futuro

Los analistas proyectan que para 2026:

- El mercado latinoamericano de activos tokenizados superará los $5 billones
- Al menos 10 países tendrán regulación específica
- Los fondos institucionales representarán el 40% de la inversión

## Conclusión

La tokenización inmobiliaria no es una moda pasajera; es una revolución en cómo concebimos la inversión en bienes raíces. LATAM está posicionada para liderar esta transformación gracias a su combinación única de necesidad de capital, adopción tecnológica y desarrollo regulatorio.`,
    category: "mercado",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    author: {
      name: "María González",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      role: "Analista de Mercados"
    },
    date: "2024-03-08",
    readTime: "8 min",
    tags: ["inmobiliario", "LATAM", "tendencias", "inversión"]
  },
  {
    id: "guia-completa-evaluar-tokens-rwa",
    title: "Guía Completa: Cómo Evaluar un Token de Activo Real Antes de Invertir",
    excerpt: "Todo lo que necesitas saber para analizar y evaluar tokens respaldados por activos reales de forma profesional.",
    content: `# Guía Completa para Evaluar Tokens de Activos Reales

Invertir en tokens de activos reales (RWA - Real World Assets) puede ser una excelente oportunidad, pero requiere un análisis cuidadoso. Esta guía te enseñará el proceso completo de evaluación.

## Paso 1: Evaluar el Activo Subyacente

### Documentación Esencial
- Título de propiedad verificado
- Avalúo independiente (no mayor a 6 meses)
- Historial de ingresos y gastos
- Pólizas de seguro vigentes

### Preguntas Clave
- ¿El activo genera flujo de caja predecible?
- ¿Cuál es su historial de apreciación?
- ¿Existen cargas o gravámenes?

## Paso 2: Analizar al Emisor

### Red Flags 🚩
1. Equipo anónimo o sin historial verificable
2. Promesas de rendimientos "garantizados"
3. Presión para invertir rápidamente
4. Falta de transparencia en documentación

### Green Flags ✅
1. Equipo con experiencia comprobable
2. Historial de proyectos exitosos
3. Alineación de incentivos con inversores
4. Comunicación abierta y frecuente

## Paso 3: Revisar la Estructura Legal

### Elementos a Verificar
- Vehículo legal utilizado (SPV, LLC, Fideicomiso)
- Jurisdicción y regulación aplicable
- Derechos exactos que otorga el token
- Mecanismo de resolución de disputas

## Paso 4: Análisis Financiero

### Métricas Clave

| Métrica | Qué indica | Valor saludable |
|---------|-----------|-----------------|
| Yield | Rendimiento anual | 6-12% |
| Cap Rate | Retorno sobre precio | 4-8% |
| LTV | Apalancamiento | <70% |
| Ocupación | Uso del activo | >90% |

### Proyecciones
- ¿Son los supuestos realistas?
- ¿Se consideran escenarios adversos?
- ¿Cómo compara con el mercado?

## Paso 5: Evaluación Técnica

### Smart Contract
- ¿Está auditado? ¿Por quién?
- ¿El código es público?
- ¿Qué estándar utiliza?

### Blockchain
- Seguridad de la red
- Costos de transacción
- Liquidez esperada

## Checklist Final

- [ ] Activo verificado y valorado
- [ ] Emisor investigado
- [ ] Documentación legal completa
- [ ] Números que cuadran
- [ ] Contrato auditado
- [ ] Riesgos identificados y aceptables

## Conclusión

No existe la inversión perfecta, pero sí existe la inversión informada. Dedica tiempo a este proceso y evitarás la mayoría de los problemas comunes en este espacio.`,
    category: "educacion",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    author: {
      name: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      role: "Director de Educación"
    },
    date: "2024-03-05",
    readTime: "12 min",
    tags: ["guía", "evaluación", "due diligence", "inversión"]
  },
  {
    id: "brasil-ley-criptoactivos-impacto",
    title: "Brasil Implementa Nueva Ley de Criptoactivos: Impacto para la Tokenización",
    excerpt: "Analizamos la Lei 14.478/2022 de Brasil y sus implicaciones para el ecosistema de tokenización de activos en el país.",
    content: `# Brasil Implementa Nueva Ley de Criptoactivos

Brasil se consolida como líder regulatorio en América Latina con la implementación completa de la Lei 14.478/2022. Este marco legal establece reglas claras para prestadores de servicios de activos virtuales y abre puertas para la tokenización de activos reales.

## Puntos Clave de la Ley

### Definiciones Claras

La ley define "activo virtual" como:
> "Representación digital de valor que puede ser negociada o transferida electrónicamente, utilizada para pagos o inversión"

Importante: excluye explícitamente:
- Moneda nacional o extranjera
- Puntos de programas de fidelidad
- Valores mobiliarios regulados por CVM

### Autoridades Competentes

- **Banco Central**: Supervisa custodios y exchanges
- **CVM**: Regula tokens considerados valores
- **COAF**: Prevención de lavado de dinero

### Requisitos para Operadores

1. Registro obligatorio ante autoridades
2. Capital mínimo establecido
3. Directores con reputación ilibada
4. Sistemas de compliance AML/CFT
5. Segregación de recursos de clientes

## Implicaciones para Tokenización

### Tokens de Activos Reales

La CVM ya había emitido el Parecer 40 estableciendo que:

- Tokens que representen participación en emprendimientos son valores
- Requieren registro o dispensa de la CVM
- Deben seguir reglas de oferta pública

### Oportunidades

1. **Claridad jurídica**: Inversores institucionales entran al mercado
2. **Legitimidad**: Mayor confianza del público general
3. **Integración bancaria**: Posibilidad de servicios combinados

### Desafíos

1. **Costos de compliance**: Barrera para startups pequeñas
2. **Burocracia**: Procesos pueden ser lentos
3. **Adaptación**: Empresas existentes deben ajustarse

## El Mercado Brasileño

### Números

- 15+ millones de brasileños tienen criptoactivos
- $10+ billones de dólares en volumen anual
- 50+ exchanges operando en el país

### Proyectos de Tokenización

Ya existen proyectos activos de:
- Tokens inmobiliarios (Netspaces, Ribus)
- Agronegocio tokenizado
- Créditos de carbono
- Precatorios judiciales

## Perspectivas

Brasil se posiciona para ser el hub de tokenización de Latinoamérica. La combinación de:
- Marco regulatorio moderno
- Mercado financiero sofisticado
- Gran población bancarizada
- Adopción cripto significativa

Crea un ambiente único para el desarrollo de este ecosistema.

## Conclusión

La implementación de esta ley es un paso fundamental para la maduración del mercado de activos digitales en Brasil. Empresas que se adapten rápidamente a este nuevo marco tendrán ventaja competitiva significativa.`,
    category: "regulacion",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
    author: {
      name: "Ana Luísa Ferreira",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
      role: "Especialista Legal"
    },
    date: "2024-03-01",
    readTime: "10 min",
    tags: ["Brasil", "regulación", "ley", "compliance"]
  },
  {
    id: "caso-exito-torre-santa-fe",
    title: "Caso de Éxito: Cómo Torre Santa Fe Recaudó $20M en 48 Horas con Tokenización",
    excerpt: "Historia completa de la tokenización exitosa de una torre de oficinas premium en Ciudad de México.",
    content: `# Caso de Éxito: Torre Santa Fe

La tokenización de Torre Santa Fe representa uno de los casos más exitosos de tokenización inmobiliaria en Latinoamérica. En apenas 48 horas, el proyecto recaudó $20 millones de dólares de más de 3,000 inversores.

## El Proyecto

### El Activo

**Torre Santa Fe** es un edificio de oficinas clase A+ ubicado en el corazón financiero de Ciudad de México.

Características:
- 25 pisos de oficinas premium
- 45,000 m² de área rentable
- Ocupación histórica: 97%
- Inquilinos Fortune 500

### Motivación para Tokenizar

El propietario, un family office mexicano, buscaba:
1. Liquidez parcial sin vender el activo completo
2. Diversificar su portafolio
3. Mantener control operativo
4. Experimentar con nuevas formas de financiamiento

## La Estructura

### Tokenomics

| Concepto | Valor |
|----------|-------|
| Valor total del edificio | $100M USD |
| Porción tokenizada | 20% |
| Monto de emisión | $20M USD |
| Número de tokens | 200,000 |
| Precio por token | $100 USD |
| Inversión mínima | $500 (5 tokens) |

### Estructura Legal

- SPV (Sociedad de Propósito Específico) en México
- Fideicomiso con banco reconocido
- Tokens como CERPIS (certificados de participación)
- Registro ante CNBV

### Rendimientos

- Yield proyectado: 8.5% anual
- Distribución: Trimestral
- Fuente: Rentas netas del edificio
- Plus: Participación en apreciación del activo

## La Venta

### Preparación (3 meses)

1. Due diligence y avalúos
2. Estructuración legal
3. Desarrollo de smart contract
4. Auditoría del contrato
5. Campaña de marketing

### Lanzamiento

- **Hora 0-6**: Inversores pre-registrados (60% vendido)
- **Hora 6-24**: Lista de espera (30% vendido)
- **Hora 24-48**: Público general (10% restante)

### Resultados

- 3,247 inversores
- Inversión promedio: $6,159 USD
- Países: México (70%), USA (15%), Colombia (5%), Otros (10%)
- 0 rechazos KYC/AML

## Lecciones Aprendidas

### Lo que Funcionó

✅ **Activo Premium**: La calidad del edificio generó confianza
✅ **Transparencia Total**: Toda documentación pública
✅ **Precio Accesible**: $100 por token amplió la base
✅ **Equipo Reputado**: El family office era conocido
✅ **Tecnología Robusta**: Sin fallas técnicas durante la venta

### Desafíos Superados

⚠️ **Educación**: Muchos inversores no entendían blockchain
→ Solución: Tutoriales y webinars previos

⚠️ **KYC Lento**: Verificación manual tomaba días
→ Solución: Partners de KYC automatizado

⚠️ **Regulación**: Proceso con CNBV complejo
→ Solución: 6 meses de trabajo previo con reguladores

## Después de la Venta

### Primer Año

- 4 distribuciones trimestrales puntuales
- Rendimiento real: 8.7% (superó proyección)
- Valor del token: +12% en mercado secundario
- Comunicación mensual con inversores

### Comunidad

- Grupo de Telegram con 2,800 miembros
- AMA trimestrales con el equipo gestor
- Visitas al edificio para holders
- Votación en decisiones menores

## Impacto en el Mercado

Torre Santa Fe demostró que:

1. **Es posible**: Tokenización inmobiliaria funciona en LATAM
2. **Hay demanda**: Miles de pequeños inversores quieren acceso
3. **Regulación existe**: Se puede hacer de forma legal
4. **Los rendimientos son reales**: No es solo especulación

## Conclusión

Este caso establece un precedente para futuros proyectos de tokenización en la región. La combinación de un activo excepcional, estructura legal sólida y ejecución impecable creó un modelo replicable.

> "Torre Santa Fe probó que la tokenización no es el futuro, es el presente. Cualquier activo de calidad puede seguir este camino." - Director del proyecto`,
    category: "casos",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    author: {
      name: "Roberto Sánchez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      role: "Editor en Jefe"
    },
    date: "2024-02-28",
    readTime: "15 min",
    tags: ["caso de éxito", "México", "inmobiliario", "tokenización"]
  }
];
