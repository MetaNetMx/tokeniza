export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  lessons: Lesson[];
  badge: string;
  points: number;
}

export const courses: Course[] = [
  {
    id: "intro-tokenizacion",
    title: "Introducción a la Tokenización",
    description: "Aprende los fundamentos de la tokenización de activos reales y cómo está transformando las inversiones tradicionales.",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    duration: "2h 30min",
    level: "Básico",
    badge: "🎓",
    points: 100,
    lessons: [
      {
        id: "intro-1",
        title: "¿Qué es la tokenización?",
        duration: "25 min",
        content: `# ¿Qué es la Tokenización?

La tokenización es el proceso de convertir derechos sobre un activo real en tokens digitales en una blockchain. Estos tokens representan una fracción del activo subyacente.

## Conceptos Clave

- **Token**: Representación digital de un activo o derecho
- **Blockchain**: Red descentralizada que registra transacciones
- **Smart Contract**: Código que ejecuta automáticamente acuerdos

## Beneficios Principales

1. **Fraccionamiento**: Divide activos de alto valor en partes accesibles
2. **Liquidez**: Facilita la compraventa de activos tradicionalmente ilíquidos
3. **Transparencia**: Registro inmutable de todas las transacciones
4. **Accesibilidad**: Democratiza el acceso a inversiones premium`,
        quiz: [
          {
            question: "¿Qué representa un token en la tokenización de activos?",
            options: [
              "Una criptomoneda como Bitcoin",
              "Una fracción de derechos sobre un activo real",
              "Un contrato legal tradicional",
              "Una acción de bolsa"
            ],
            correctIndex: 1
          }
        ]
      },
      {
        id: "intro-2",
        title: "Historia y evolución",
        duration: "30 min",
        content: `# Historia de la Tokenización

## Los Inicios (2017-2019)

La tokenización surgió como una extensión natural de las ICOs (Initial Coin Offerings), pero con activos reales como respaldo.

## Maduración del Mercado (2020-2022)

- Regulaciones más claras en varios países
- Primeros proyectos inmobiliarios tokenizados exitosos
- Entrada de instituciones financieras tradicionales

## El Presente (2023+)

- Mercado global de activos tokenizados superando $10 billones
- Tokenización de arte, commodities, propiedad intelectual
- Integración con finanzas descentralizadas (DeFi)`,
        quiz: [
          {
            question: "¿En qué periodo comenzó la maduración del mercado de tokenización?",
            options: ["2015-2017", "2020-2022", "2010-2012", "2025-2027"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "intro-3",
        title: "Tipos de tokens",
        duration: "35 min",
        content: `# Tipos de Tokens

## Security Tokens

Representan valores financieros y están sujetos a regulaciones de valores:
- Tokens de equity (participación)
- Tokens de deuda (bonos)
- Tokens de revenue share (reparto de ingresos)

## Utility Tokens

Proporcionan acceso a un producto o servicio específico dentro de una plataforma.

## Asset-Backed Tokens

Respaldados directamente por activos físicos:
- Inmuebles
- Oro y metales preciosos
- Arte y coleccionables

## Diferencias Clave

| Tipo | Regulación | Respaldo | Uso |
|------|-----------|----------|-----|
| Security | Alta | Activo/Empresa | Inversión |
| Utility | Media | Servicio | Acceso |
| Asset-Backed | Alta | Físico | Propiedad |`,
        quiz: [
          {
            question: "¿Qué tipo de token representa participación en una empresa?",
            options: ["Utility Token", "Security Token de Equity", "NFT", "Stablecoin"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "intro-4",
        title: "El proceso de tokenización",
        duration: "30 min",
        content: `# El Proceso de Tokenización

## Paso 1: Selección del Activo
- Evaluación del activo
- Due diligence legal
- Valoración independiente

## Paso 2: Estructuración Legal
- Creación de vehículo legal (SPV)
- Documentación del prospecto
- Cumplimiento regulatorio

## Paso 3: Desarrollo Técnico
- Diseño del smart contract
- Selección de blockchain
- Auditoría de seguridad

## Paso 4: Emisión y Distribución
- Creación de tokens
- Proceso de KYC/AML para inversores
- Venta primaria

## Paso 5: Mercado Secundario
- Listado en exchanges
- Trading entre inversores
- Distribución de rendimientos`,
        quiz: [
          {
            question: "¿Qué se crea en el paso de estructuración legal?",
            options: ["El smart contract", "El token", "El SPV (vehículo legal)", "La blockchain"],
            correctIndex: 2
          }
        ]
      },
      {
        id: "intro-5",
        title: "Casos de uso reales",
        duration: "30 min",
        content: `# Casos de Uso Reales

## Inmobiliario
**Ejemplo**: Torre de oficinas en Miami tokenizada por $30M
- 3,000 tokens de $10,000 cada uno
- Rendimiento anual del 8%
- Distribución trimestral de rentas

## Arte y Coleccionables
**Ejemplo**: Obra de Picasso fraccionada
- 10,000 tokens
- Acceso a exhibiciones exclusivas
- Participación en la apreciación

## Commodities
**Ejemplo**: Reserva de oro tokenizada
- 1 token = 1 gramo de oro
- Custodia en bóveda certificada
- Redimible por oro físico

## Deuda Corporativa
**Ejemplo**: Bono empresarial tokenizado
- Cupón del 6% anual
- Plazo de 3 años
- Pago automático via smart contract`,
        quiz: [
          {
            question: "En el ejemplo de la torre de oficinas, ¿cuánto vale cada token?",
            options: ["$1,000", "$5,000", "$10,000", "$30,000"],
            correctIndex: 2
          }
        ]
      }
    ]
  },
  {
    id: "blockchain-inversores",
    title: "Blockchain para Inversores",
    description: "Entiende cómo funciona la tecnología blockchain y por qué es fundamental para los activos digitales.",
    thumbnail: "https://images.unsplash.com/photo-1644143379190-08a5f055de1d?w=800",
    duration: "2h",
    level: "Básico",
    badge: "⛓️",
    points: 80,
    lessons: [
      {
        id: "bc-1",
        title: "Fundamentos de Blockchain",
        duration: "30 min",
        content: `# Fundamentos de Blockchain

## ¿Qué es una Blockchain?

Una blockchain es un libro de contabilidad distribuido, inmutable y transparente que registra transacciones de forma cronológica.

## Características Principales

### Descentralización
No existe una autoridad central. La red es mantenida por múltiples nodos independientes.

### Inmutabilidad
Una vez registrada, una transacción no puede ser alterada ni eliminada.

### Transparencia
Todas las transacciones son visibles públicamente (con pseudonimato).

### Seguridad
Criptografía avanzada protege cada transacción y bloque.`,
        quiz: [
          {
            question: "¿Cuál NO es una característica de blockchain?",
            options: ["Descentralización", "Inmutabilidad", "Control centralizado", "Transparencia"],
            correctIndex: 2
          }
        ]
      },
      {
        id: "bc-2",
        title: "Ethereum y Smart Contracts",
        duration: "30 min",
        content: `# Ethereum y Smart Contracts

## ¿Qué es Ethereum?

Ethereum es una plataforma blockchain que permite ejecutar programas llamados "smart contracts".

## Smart Contracts

Son programas auto-ejecutables que:
- Ejecutan automáticamente cuando se cumplen condiciones
- No requieren intermediarios
- Son transparentes y auditables

## Estándares de Tokens

### ERC-20
Token fungible básico. Cada token es idéntico e intercambiable.

### ERC-721 (NFTs)
Tokens no fungibles. Cada uno es único.

### ERC-1400
Diseñado específicamente para security tokens con compliance integrado.`,
        quiz: [
          {
            question: "¿Qué estándar está diseñado específicamente para security tokens?",
            options: ["ERC-20", "ERC-721", "ERC-1400", "ERC-777"],
            correctIndex: 2
          }
        ]
      },
      {
        id: "bc-3",
        title: "Wallets y custodia",
        duration: "30 min",
        content: `# Wallets y Custodia

## Tipos de Wallets

### Hot Wallets
- Conectados a internet
- Convenientes para uso diario
- Menor seguridad
- Ejemplos: MetaMask, Trust Wallet

### Cold Wallets
- Desconectados de internet
- Máxima seguridad
- Para almacenamiento largo plazo
- Ejemplos: Ledger, Trezor

## Custodia

### Self-custody
Tú controlas tus llaves privadas. Mayor responsabilidad pero total control.

### Custodial
Un tercero custodia tus activos. Más conveniente pero dependes de ellos.

## Mejores Prácticas
1. Nunca compartas tu seed phrase
2. Usa autenticación de dos factores
3. Diversifica entre wallets
4. Haz respaldos seguros`,
        quiz: [
          {
            question: "¿Qué tipo de wallet ofrece mayor seguridad?",
            options: ["Hot Wallet", "Cold Wallet", "Exchange Wallet", "Mobile Wallet"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "bc-4",
        title: "Gas y costos de transacción",
        duration: "30 min",
        content: `# Gas y Costos de Transacción

## ¿Qué es el Gas?

El gas es la unidad que mide el trabajo computacional necesario para ejecutar operaciones en Ethereum.

## Componentes del Costo

### Gas Limit
Máximo de gas que estás dispuesto a usar.

### Gas Price (Gwei)
Precio por unidad de gas. 1 Gwei = 0.000000001 ETH

### Costo Total
Gas usado × Gas Price = Costo en ETH

## Layer 2 Solutions

Para reducir costos, existen soluciones como:
- **Polygon**: Gas ~$0.01 por transacción
- **Arbitrum**: Más rápido y económico
- **Base**: Desarrollado por Coinbase

## Cuándo son Altos los Costos
- Alta congestión de red
- Operaciones complejas (smart contracts)
- Momentos de alta demanda (NFT drops)`,
        quiz: [
          {
            question: "¿Qué es una solución Layer 2?",
            options: [
              "Una nueva blockchain completamente separada",
              "Una capa sobre Ethereum que reduce costos",
              "Un tipo de wallet",
              "Un exchange descentralizado"
            ],
            correctIndex: 1
          }
        ]
      }
    ]
  },
  {
    id: "regulacion-latam",
    title: "Regulación Cripto en LATAM",
    description: "Conoce el marco legal de criptoactivos y tokenización en los principales países de Latinoamérica.",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    duration: "3h",
    level: "Intermedio",
    badge: "⚖️",
    points: 150,
    lessons: [
      {
        id: "reg-1",
        title: "México",
        duration: "30 min",
        content: `# Regulación en México

## Ley Fintech (2018)

México fue pionero en LATAM con su Ley para Regular las Instituciones de Tecnología Financiera.

## Puntos Clave

### Activos Virtuales
- Definidos como representación de valor electrónico
- No son moneda de curso legal
- Regulados por Banco de México y CNBV

### ITFs (Instituciones de Tecnología Financiera)
- Requieren autorización de CNBV
- Capital mínimo requerido
- Cumplimiento AML/KYC obligatorio

### Tokens de Valor
- Considerados valores bajo Ley del Mercado de Valores
- Requieren registro ante CNBV
- Prospecto de inversión obligatorio

## Implicaciones para Tokenización
- Proceso claro pero exigente
- Regulación favorable vs otros países
- Creciente ecosistema de servicios`,
        quiz: [
          {
            question: "¿En qué año se promulgó la Ley Fintech en México?",
            options: ["2016", "2018", "2020", "2022"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "reg-2",
        title: "Colombia",
        duration: "30 min",
        content: `# Regulación en Colombia

## Estado Actual

Colombia no tiene una ley específica para criptoactivos, pero existe regulación indirecta.

## Sandbox Regulatorio

La Superintendencia Financiera opera un sandbox donde:
- Empresas pueden probar innovaciones
- Período de prueba controlado
- Posibilidad de obtener licencia

## Superintendencia Financiera

### Circular 052 de 2017
- Entidades financieras no pueden operar con cripto directamente
- Pueden invertir en empresas cripto

### Sandbox LaArenera
- Programa de innovación financiera
- Casos de tokenización en prueba
- Resultados prometedores

## Consideraciones Fiscales
- Criptoactivos tributan como renta
- Declaración obligatoria sobre $50M COP
- Sin IVA en compraventa`,
        quiz: [
          {
            question: "¿Cómo se llama el sandbox regulatorio en Colombia?",
            options: ["FinLab", "LaArenera", "CryptoSandbox", "InnovaCol"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "reg-3",
        title: "Argentina",
        duration: "30 min",
        content: `# Regulación en Argentina

## Marco Actual

Argentina tiene un enfoque relativamente permisivo hacia las criptomonedas.

## CNV (Comisión Nacional de Valores)

### Resolución General 994/2023
- Regula la oferta pública de criptoactivos
- Requisitos para emisores
- Protección al inversor

### Tokens de Valor
- Sujetos a ley de mercado de capitales
- Registro obligatorio
- Prospecto de emisión

## BCRA (Banco Central)

- Entidades financieras no pueden ofrecer cripto
- Restricciones de compra con dólares oficiales
- Monitoreo de transferencias

## Oportunidades
- Alta adopción cripto en población
- Demanda por alternativas al peso
- Ecosistema emprendedor activo`,
        quiz: [
          {
            question: "¿Qué organismo regula la oferta pública de criptoactivos en Argentina?",
            options: ["BCRA", "CNV", "AFIP", "SEC"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "reg-4",
        title: "Brasil",
        duration: "30 min",
        content: `# Regulación en Brasil

## Marco Legal (Lei 14.478/2022)

Brasil aprobó en 2022 una ley específica para regular activos virtuales.

## Puntos Principales

### Definiciones
- Activo virtual como representación digital de valor
- Distingue de moneda electrónica y valores

### Autoridades
- Banco Central: custodios y exchanges
- CVM: tokens considerados valores

### Requisitos para Operadores
- Registro obligatorio
- Capital mínimo
- Compliance AML/CFT

## Tokenización de Activos Reales

### CVM Parecer 40
- Framework para tokens de valor
- Proceso de registro
- Información obligatoria

### Casos de Éxito
- Tokens inmobiliarios activos
- Agronegocio tokenizado
- Créditos de carbono`,
        quiz: [
          {
            question: "¿En qué año aprobó Brasil su ley de activos virtuales?",
            options: ["2020", "2021", "2022", "2023"],
            correctIndex: 2
          }
        ]
      },
      {
        id: "reg-5",
        title: "Chile",
        duration: "30 min",
        content: `# Regulación en Chile

## Ley Fintec (2023)

Chile aprobó recientemente su Ley de Tecnología Financiera.

## Elementos Clave

### CMF como Regulador
- Comisión para el Mercado Financiero supervisa
- Registro de proveedores de servicios
- Estándares de seguridad

### Servicios Regulados
- Exchanges de criptoactivos
- Custodia de activos digitales
- Emisión de tokens

### Requisitos
- Autorización previa
- Patrimonio mínimo
- Sistemas de gestión de riesgo

## Sandbox Regulatorio
- Espacio para innovación controlada
- Duración de 2 años
- Condiciones flexibles

## Perspectivas
- Regulación moderna y clara
- Atractivo para empresas cripto
- Integración con sistema financiero`,
        quiz: [
          {
            question: "¿Qué autoridad regula los criptoactivos en Chile?",
            options: ["Banco Central", "CMF", "SVS", "SII"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "reg-6",
        title: "Perú y otros países",
        duration: "30 min",
        content: `# Perú y Otros Países

## Perú

### Estado Actual
- Sin regulación específica
- Criptoactivos no son moneda legal
- SUNAT: tributación como ganancia de capital

### Proyectos de Ley
- Varios proyectos en Congreso
- Enfoque en protección al consumidor
- Regulación de exchanges esperada

## Uruguay

- Proyecto de ley en discusión
- BCU estudia CBDC (peso digital)
- Enfoque experimental

## Panamá

- Ley aprobada en 2022
- Permite uso de cripto para pagos
- Atractivo para empresas

## El Salvador

- Bitcoin como moneda legal (2021)
- Único país del mundo
- Bonos Volcano en desarrollo

## Recomendaciones Generales
1. Consultar siempre asesoría legal local
2. Monitorear cambios regulatorios
3. Documentar todas las operaciones
4. Cumplir obligaciones fiscales`,
        quiz: [
          {
            question: "¿Qué país adoptó Bitcoin como moneda de curso legal?",
            options: ["Panamá", "El Salvador", "Brasil", "México"],
            correctIndex: 1
          }
        ]
      }
    ]
  },
  {
    id: "evaluar-tokens",
    title: "Cómo Evaluar un Token de Activo Real",
    description: "Metodología práctica para analizar y evaluar oportunidades de inversión en tokens de activos reales.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    duration: "2h",
    level: "Intermedio",
    badge: "🔍",
    points: 120,
    lessons: [
      {
        id: "eval-1",
        title: "Due diligence del activo",
        duration: "30 min",
        content: `# Due Diligence del Activo

## ¿Por qué es importante?

El activo subyacente es la base de tu inversión. Un token es tan bueno como el activo que representa.

## Checklist de Evaluación

### Documentación
- [ ] Título de propiedad verificado
- [ ] Avalúo independiente reciente
- [ ] Historial de ingresos
- [ ] Contratos de arrendamiento (si aplica)

### Valoración
- ¿El precio está justificado?
- ¿Hay múltiples avalúos?
- ¿Metodología de valoración transparente?

### Ubicación (Inmuebles)
- Zona en crecimiento o declive
- Infraestructura cercana
- Planes de desarrollo urbano

### Calidad del Activo
- Estado de conservación
- Antigüedad y vida útil
- Costos de mantenimiento esperados`,
        quiz: [
          {
            question: "¿Qué documento es esencial para verificar en inmuebles?",
            options: ["Recibo de luz", "Título de propiedad", "Contrato de internet", "Plano arquitectónico"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "eval-2",
        title: "Análisis del emisor",
        duration: "30 min",
        content: `# Análisis del Emisor

## Quién está detrás del token

### Historial del Equipo
- Experiencia en el sector
- Proyectos anteriores
- Reputación en el mercado

### Estructura Corporativa
- Vehículo legal utilizado (SPV, LLC, etc.)
- Jurisdicción de incorporación
- Relación con el activo

### Red Flags 🚩
- Equipo anónimo
- Sin historial verificable
- Promesas de rendimientos garantizados
- Presión para invertir rápido

## Preguntas Clave

1. ¿Quiénes son los directivos?
2. ¿Han tokenizado activos antes?
3. ¿Cuál es su participación en el proyecto?
4. ¿Cómo se alinean sus incentivos con los inversores?

## Verificación
- LinkedIn de directivos
- Registro de empresas
- Noticias y menciones
- Referencias de inversores previos`,
        quiz: [
          {
            question: "¿Cuál es una red flag al evaluar un emisor?",
            options: [
              "Equipo con experiencia en el sector",
              "Promesas de rendimientos garantizados",
              "Historial de proyectos exitosos",
              "Estructura legal clara"
            ],
            correctIndex: 1
          }
        ]
      },
      {
        id: "eval-3",
        title: "Análisis financiero",
        duration: "30 min",
        content: `# Análisis Financiero

## Métricas Clave

### Rendimiento Esperado (Yield)
- ¿Es realista comparado con el mercado?
- ¿Cómo se calcula?
- ¿Incluye apreciación de capital?

### Estructura de Distribución
- Frecuencia de pagos
- Mecanismo de distribución
- Deducciones (fees, mantenimiento, reservas)

### Proyecciones Financieras
- Supuestos utilizados
- Sensibilidad a cambios
- Escenarios pesimista/optimista

## Análisis de Riesgos

### Riesgo de Vacancia (Inmuebles)
- Tasa histórica de ocupación
- Contratos vigentes
- Demanda de la zona

### Riesgo de Precio
- Volatilidad del mercado
- Correlación con factores macro
- Liquidez del mercado secundario

### Comparación
| Métrica | Proyecto | Mercado |
|---------|----------|---------|
| Yield | 8% | 6-10% |
| Cap Rate | 5% | 4-7% |
| Ocupación | 95% | 90% |`,
        quiz: [
          {
            question: "¿Qué métrica indica la tasa de rendimiento sobre el precio del activo?",
            options: ["ROI", "Cap Rate", "P/E Ratio", "Beta"],
            correctIndex: 1
          }
        ]
      },
      {
        id: "eval-4",
        title: "Evaluación técnica y legal",
        duration: "30 min",
        content: `# Evaluación Técnica y Legal

## Aspectos Técnicos

### Smart Contract
- ¿Está auditado?
- ¿Quién realizó la auditoría?
- ¿Es el código open source?

### Blockchain Elegida
- Seguridad de la red
- Costos de transacción
- Escalabilidad

### Estándar del Token
- ERC-20: básico, sin restricciones
- ERC-1400: compliance integrado
- ERC-3643: identidad on-chain

## Aspectos Legales

### Documentación Requerida
- Prospecto de inversión
- Términos y condiciones
- Política de privacidad
- Disclaimers de riesgo

### Jurisdicción
- ¿Dónde está registrado?
- ¿Qué leyes aplican?
- ¿Cómo se resuelven disputas?

### Cumplimiento Regulatorio
- Registro ante autoridades
- Requisitos KYC/AML
- Restricciones geográficas

## Checklist Final
- [ ] Contrato auditado
- [ ] Documentos legales completos
- [ ] Jurisdicción clara
- [ ] Proceso KYC establecido`,
        quiz: [
          {
            question: "¿Qué estándar de token incluye compliance integrado?",
            options: ["ERC-20", "ERC-721", "ERC-1400", "ERC-777"],
            correctIndex: 2
          }
        ]
      }
    ]
  },
  {
    id: "seguridad-inversiones",
    title: "Seguridad en Inversiones Digitales",
    description: "Protege tus inversiones con las mejores prácticas de seguridad en el mundo cripto.",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    duration: "1h 30min",
    level: "Básico",
    badge: "🔒",
    points: 75,
    lessons: [
      {
        id: "sec-1",
        title: "Seguridad de wallets",
        duration: "30 min",
        content: `# Seguridad de Wallets

## Tu Wallet es tu Banco

En cripto, tú eres tu propio banco. Esto significa total responsabilidad.

## Seed Phrase (Frase Semilla)

### ¿Qué es?
12-24 palabras que pueden regenerar tu wallet. Es la llave maestra.

### NUNCA:
- La guardes digitalmente (fotos, cloud, notas)
- La compartas con nadie
- La ingreses en sitios web

### SÍ:
- Escríbela en papel
- Guárdala en lugar seguro (caja fuerte)
- Considera múltiples copias en ubicaciones diferentes

## Mejores Prácticas

### Hardware Wallet
- Dispositivo físico aislado de internet
- Firma transacciones offline
- Protege contra malware

### Autenticación
- 2FA en todas las cuentas
- Preferir apps (Google Auth) sobre SMS
- Contraseñas únicas y fuertes

### Diversificación
- No todos los huevos en una canasta
- Diferentes wallets para diferentes propósitos
- Hot wallet: uso diario (poco monto)
- Cold wallet: almacenamiento (mayor monto)`,
        quiz: [
          {
            question: "¿Dónde NUNCA debes guardar tu seed phrase?",
            options: [
              "En una caja fuerte",
              "En papel en múltiples ubicaciones",
              "En fotos o almacenamiento en la nube",
              "Grabada en metal"
            ],
            correctIndex: 2
          }
        ]
      },
      {
        id: "sec-2",
        title: "Reconociendo estafas",
        duration: "30 min",
        content: `# Reconociendo Estafas

## Tipos Comunes de Estafas

### Phishing
- Emails falsos de plataformas conocidas
- Links a sitios clonados
- Solicitan credenciales o seed phrase

### Rug Pull
- Proyecto atractivo que desaparece
- Desarrolladores anónimos
- Liquidez retirada repentinamente

### Pump and Dump
- Inflan precio artificialmente
- Venden en el pico
- Precio colapsa

### Impersonation
- Falsos perfiles de soporte
- "Giveaways" de celebridades
- Mensajes directos no solicitados

## Señales de Alerta 🚨

1. "Rendimientos garantizados" altos
2. Presión para invertir YA
3. Solo puedes ganar, nunca perder
4. Equipo anónimo o inverificable
5. Tokenomics que no tienen sentido
6. Sin auditorías o código cerrado

## Cómo Protegerte

- Verifica URLs siempre (https, dominio correcto)
- No hagas clic en links de emails
- Investiga antes de invertir (DYOR)
- Si es demasiado bueno, probablemente es falso
- Nunca envíes cripto a "soporte técnico"`,
        quiz: [
          {
            question: "¿Qué es un 'Rug Pull'?",
            options: [
              "Una estrategia de trading legítima",
              "Un proyecto que desaparece con los fondos",
              "Un tipo de hardware wallet",
              "Un contrato inteligente seguro"
            ],
            correctIndex: 1
          }
        ]
      },
      {
        id: "sec-3",
        title: "Mejores prácticas operativas",
        duration: "30 min",
        content: `# Mejores Prácticas Operativas

## Antes de Invertir

### Investigación (DYOR)
1. Lee el whitepaper/prospecto completo
2. Verifica el equipo
3. Busca auditorías
4. Lee reviews independientes
5. Únete a la comunidad y observa

### Verificación de Plataformas
- Usa solo plataformas reconocidas
- Verifica certificaciones y licencias
- Revisa historial de seguridad
- Lee términos y condiciones

## Durante la Inversión

### Monitoreo
- Revisa tu portafolio regularmente
- Configura alertas de precio
- Mantente informado de noticias

### Documentación
- Guarda comprobantes de transacciones
- Registra para efectos fiscales
- Mantén historial organizado

## Seguridad General

### Dispositivos
- Antivirus actualizado
- Sistema operativo al día
- Evita redes WiFi públicas

### Cuentas
- Email exclusivo para cripto
- Contraseñas únicas (password manager)
- Revisa actividad sospechosa

## Plan de Emergencia
- Ten un plan si algo sale mal
- Conoce los procesos de soporte
- Guarda contactos importantes`,
        quiz: [
          {
            question: "¿Qué significa DYOR?",
            options: [
              "Do Your Own Research",
              "Digital Yield Online Return",
              "Download Your Own Records",
              "Diversify Your Online Resources"
            ],
            correctIndex: 0
          }
        ]
      }
    ]
  }
];

export interface UserProgress {
  odacoursepletedLessons: string[];
  courseProgress: Record<string, number>;
  totalPoints: number;
  badges: string[];
  level: number;
  certificates: string[];
}

export const calculateLevel = (points: number): number => {
  if (points < 100) return 1;
  if (points < 250) return 2;
  if (points < 500) return 3;
  if (points < 1000) return 4;
  return 5;
};

export const getLevelName = (level: number): string => {
  const names = ["Novato", "Aprendiz", "Intermedio", "Avanzado", "Experto"];
  return names[level - 1] || "Novato";
};
