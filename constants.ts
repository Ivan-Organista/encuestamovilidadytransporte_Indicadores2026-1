
import type { SurveyFormData } from './types';

export const initialFormData: SurveyFormData = {
  age: '',
  occupation: '',
  occupationOther: '',
  sex: '',
  residence: '',
  residenceDetails: '',
  physicalImpediment: '',
  physicalImpedimentDetails: '',
  travelToOtherPlace: '',
  otherPlaceCityPart: '',
  otherPlaceReason: '',
  transportModes: {},
  transportWaitTime: '',
  alternateRoutes: '',
  alternateRoutesCount: '',
  dailyTransports: '',
  peakHour: '',
  totalTimeInTransport: '',
  weeklyTransportCost: '',
  incomePercentageForTransport: '',
  transportAspectsRating: { comfort: '', cleanliness: '', security: '', punctuality: '', cost: '' },
  comfortFactorsRanking: {},
  cleanlinessFactorsRanking: {},
  securityFactorsRanking: {},
  punctualityFactorsRanking: {},
  incidentsLastYear: {},
  delayFrequencyDuration: '',
  sufferingsLastYear: {},
  costAspectsRating: { distance: '', cleanliness: '', security: '', punctuality: '', comfort: '', serviceQuality: '' },
  agreePriceIncreaseImprovesQuality: '',
  willingToPayIncrease: '',
  mobilityImprovements: '',
};

const transportModesList = [
  'Metro', 'Metrobús', 'Microbús', 'Combi', 'Camión concesionado', 'Trolebús',
  'Cablebús', 'Taxi', 'Taxi de aplicación', 'Bicicleta', 'Motocicleta',
  'Tren ligero', 'Suburbano', 'Auto particular', 'Mexibus', 'Caminando', 'RTP', 'Otro'
];

export const formSections = [
    {
        title: 'Datos Generales',
        questions: [
            { id: 'age', section: 'general', type: 'number', label: 'Edad', required: true },
            { 
                id: 'occupation', section: 'general', type: 'radio', label: 'Ocupación', required: true,
                options: ['Estudiante', 'Administrativo', 'Académico', 'Otro'],
                children: [{
                    id: 'occupationOther', section: 'general', type: 'text', label: 'Indica cuál', showWhen: 'Otro', required: true
                }]
            },
            { id: 'sex', section: 'general', type: 'radio', label: 'Sexo', required: true, options: ['Masculino', 'Femenino', 'Prefiero no decirlo'] },
            { 
                id: 'residence', section: 'general', type: 'radio', label: 'Lugar de residencia', required: true,
                options: ['Ciudad de México', 'Edo de México', 'Otro'],
                children: [{
                    id: 'residenceDetails', section: 'general', type: 'text', label: 'Alcaldía / Municipio / Indique cuál', showWhen: 'Ciudad de México', required: true
                },{
                    id: 'residenceDetails', section: 'general', type: 'text', label: 'Alcaldía / Municipio / Indique cuál', showWhen: 'Edo de México', required: true
                },{
                    id: 'residenceDetails', section: 'general', type: 'text', label: 'Alcaldía / Municipio / Indique cuál', showWhen: 'Otro', required: true
                }]
            },
            { 
                id: 'physicalImpediment', section: 'general', type: 'radio', label: '¿Tiene algún impedimento físico?', required: true,
                options: ['Si', 'No'],
                children: [{
                    id: 'physicalImpedimentDetails', section: 'general', type: 'text', label: 'Indica cuál', showWhen: 'Si', required: true
                }]
            }
        ]
    },
    {
        title: 'Información sobre el transporte',
        questions: [
            { 
                number: 1, id: 'travelToOtherPlace', section: 'transport', type: 'radio', label: 'En un día normal, aparte de venir a Ciudad Universitaria, ¿te desplazas a otro lugar?', required: true,
                options: ['Si', 'No'],
                children: [
                    { id: 'otherPlaceCityPart', section: 'transport', type: 'text', label: '¿A qué parte de la ciudad?', showWhen: 'Si', required: true },
                    { id: 'otherPlaceReason', section: 'transport', type: 'text', label: '¿Por qué razón? (Trabajo, escuela, cursos, deporte)', showWhen: 'Si', required: true }
                ]
            },
            {
                number: 2, id: 'transportModes', section: 'transportModes', type: 'ranking', label: '¿Cuál es su principal medio de transporte?',
                description: 'Enumera del 1 en adelante, donde 1 es el principal. Usa todos los que necesites.',
                items: transportModesList,
                maxRank: transportModesList.length,
            },
            {
                number: 3, id: 'transportWaitTime', section: 'transport', type: 'radio', label: '¿Qué tanto tiempo esperas para abordar el transporte?',
                options: ['Menos de 5 min', 'De 5 min a menos de 10 min', 'De 10 min a menos de 20 min', 'De 20 min a menos de 30 min', 'Más de 30 min'],
                required: true
            },
            {
                number: 4, id: 'alternateRoutes', section: 'transport', type: 'radio', label: '¿Existen rutas alternas de transporte para desplazarte a tus actividades?',
                options: ['Si', 'No'], required: true,
                children: [{
                    id: 'alternateRoutesCount', section: 'transport', type: 'text', label: '¿Cuántas y cuáles?', showWhen: 'Si', required: true
                }]
            },
            { number: 5, id: 'dailyTransports', section: 'transport', type: 'radio', label: '¿Cuántos transportes usa diariamente de manera normal?', options: ['Ninguno', '1-2', '3-4', '5 o más'], required: true },
            { number: 6, id: 'peakHour', section: 'transport', type: 'radio', label: '¿En qué horario usas más el transporte?', options: ['Matutino (4 am a 12 pm)', 'Medio día (12 pm a 3 pm)', 'Vespertino (3 pm a 8 pm)', 'Nocturno (8 pm en adelante)'], required: true },
            { number: 7, id: 'totalTimeInTransport', section: 'transport', type: 'radio', label: 'En un día normal, ¿Cuánto tiempo total permaneces en el transporte?', options: ['Menos de 30 min', 'De 30 min a menos de una hora', 'De una hora a menos de dos horas', 'De dos horas y hasta menos de 3 horas', 'Más de 3 horas'], required: true },
            { number: 8, id: 'weeklyTransportCost', section: 'transport', type: 'radio', label: '¿Cuánto gastas a la semana en transporte?', options: ['Menos de 50 pesos', 'De 50 a menos de 100 pesos', 'De 100 a menos de 200 pesos', 'De 200 a menos de 300 pesos', 'Más de 300 pesos'], required: true },
            { number: 9, id: 'incomePercentageForTransport', section: 'transport', type: 'radio', label: '¿Qué tanto porcentaje de tu ingreso, destinas al pago de transporte?', options: ['Menos del 10%', 'Entre el 10% y 20%', 'Entre 21% y 30%', 'Entre 31 y 40%', 'Más del 40%'], required: true },
            { 
                number: 10, id: 'transportAspectsRating', section: 'transportAspectsRating', type: 'rating-scale',
                label: '¿Cuál es tu opinión de los siguientes aspectos, midiendo en una escala de 1 a 10, donde 1 es muy insatisfecho y 10 muy satisfecho?',
                items: [
                    {id: 'comfort', label: 'Comodidad'}, {id: 'cleanliness', label: 'Limpieza'},
                    {id: 'security', label: 'Seguridad'}, {id: 'punctuality', label: 'Puntualidad'}, {id: 'cost', label: 'Costo'}
                ],
                required: true
            },
            {
                number: 11, id: 'comfortFactorsRanking', section: 'comfortFactorsRanking', type: 'ranking',
                label: 'Pensando en la comodidad del transporte, ¿qué tan importantes son los siguientes aspectos?',
                instruction: 'De la siguiente lista, elige 5 características y enumera del 1 al 5, donde 1 es la más importante y así sucesivamente.',
                items: [
                    'Que haya lugares disponibles', 'Que haya suficiente espacio', 'Que las estaciones de parada estén en buenas condiciones',
                    'Que el chofer maneje adecuadamente', 'Que maneje a la velocidad máxima permitida', 'Que respete los señalamientos',
                    'Que el transporte este en óptimas condiciones', 'Que haya paradas predeterminadas (fijas)', 'Que haya ventilación adecuada',
                    'Que no haya ruido excesivo (música, motor)', 'Que no haya vendedores', 'Que haya conectividad (internet y señal de telefonía)', 'Que sea accesible abordar'
                ],
                maxRank: 5
            },
            {
                number: 12, id: 'cleanlinessFactorsRanking', section: 'cleanlinessFactorsRanking', type: 'ranking',
                label: 'Pensando en la limpieza del transporte, ¿qué tan importantes son los siguientes aspectos?',
                instruction: 'Enumera del 1 al 5, donde 1 es la más importante y así sucesivamente.',
                items: [
                    'Que no haya olores desagradables', 'Que no haya basura tirada (bolsas, envases, envolturas)', 
                    'Que el transporte esté limpio (líquidos, suelos y paredes manchados)', 'Que no sea contaminante (humo visible)', 'Que no se permita consumir alimentos'
                ],
                maxRank: 5
            },
            {
                number: 13, id: 'securityFactorsRanking', section: 'securityFactorsRanking', type: 'ranking',
                label: 'Pensando en la seguridad, ¿qué tan importantes son los siguientes aspectos?',
                instruction: 'Elige 5 que consideras más importantes, enumera con 1 el más importante y así sucesivamente.',
                items: [
                    'Que haya cámaras de seguridad', 'Que haya presencia de cuerpos policiacos', 'Que haya revisiones aleatorias',
                    'Que haya botones de pánico', 'Que haya áreas exclusivas', 'Que las vías principales no tengan baches',
                    'Que haya atención oportuna', 'Que se prohíba la venta de productos al interior', 'Que se respete la capacidad máxima de los vehículos',
                    'Que los transbordos están vigilados', 'Que los transbordos sean seguros (fácil acceso, iluminado)'
                ],
                maxRank: 5
            },
            {
                number: 14, id: 'punctualityFactorsRanking', section: 'punctualityFactorsRanking', type: 'ranking',
                label: 'Pensando en la puntualidad del transporte, ¿qué tan importantes son los siguientes aspectos?',
                instruction: 'Enumera del 1 al 4 considerando la importancia, el 1 será el más importante y así sucesivamente.',
                items: ['Que no haya muchos tiempos de espera entre unidades', 'Que haya suficientes unidades', 'Que no haya retrasos', 'Que haya rutas alternas'],
                maxRank: 4
            },
            {
                number: 15, id: 'incidentsLastYear', section: 'incidentsLastYear', type: 'check-and-count',
                label: 'De la siguiente lista, selecciona lo que te haya ocurrido al usar el transporte en el último año.',
                items: [
                    'Choques (muros, postes, banquetas)', 'Colisión entre autos', 'Asalto a mano armada', 'Riñas (peleas a golpes, empujones)',
                    'Robo de pertenencias', 'Hostigamiento', 'Hostigamiento sexual', 'Discusiones', 'Desalojo por falla técnica',
                    'Ataques directos contra tu persona (jeringas)', 'Intento de secuestro', 'Extorsión por parte de autoridades'
                ]
            },
             {
                number: 16, id: 'delayFrequencyDuration', section: 'delayFrequencyDuration', type: 'grid-radio',
                label: 'En el último año, ¿qué tanto has sufrido de atrasos en el transporte?',
                rows: ['Menos 5 de veces', '5 a 15 veces', '16 a 25 veces', '26 a 50 veces', 'Más de 50 veces'],
                columns: ['De 10 a 20 min', '20 a 30 min', '30 min a 1 hr', 'Más de 1 hora']
            },
            {
                number: 17, id: 'sufferingsLastYear', section: 'sufferingsLastYear', type: 'check-and-count',
                label: 'En el último año, ¿qué tanto has sufrido de...?',
                items: [
                    'Fallas eléctricas', 'Fallas mecánicas', 'Inundaciones del transporte', 'Bloqueo de ruta por inundaciones',
                    'Bloqueo por manifestantes', 'Falta de transporte (cierres, paro de unidades)', 'Tránsito pesado',
                    'Baches', 'Cierre de vialidades por reparaciones', 'Cobros excesivos'
                ]
            },
            {
                number: 18, id: 'costAspectsRating', section: 'costAspectsRating', type: 'rating-scale',
                label: 'Respecto al costo en el último año, en una escala de 1 a 10, dónde 1 es totalmente inadecuado y 10 totalmente adecuado.',
                items: [
                    { id: 'distance', label: 'El precio es justo relacionado con la distancia' },
                    { id: 'cleanliness', label: 'El precio es justo relacionado con la limpieza' },
                    { id: 'security', label: 'El precio es justo relacionado con la seguridad' },
                    { id: 'punctuality', label: 'El precio es justo relacionado con la puntualidad' },
                    { id: 'comfort', label: 'El precio es justo relacionado con la comodidad' },
                    { id: 'serviceQuality', label: 'El precio es justo relacionado con la calidad del servicio' },
                ],
                required: true
            },
            { 
                number: 19, id: 'agreePriceIncreaseImprovesQuality', section: 'evaluation', type: 'number',
                label: 'En una escala de 1 a 10, donde 1 es totalmente en desacuerdo y 10 totalmente de acuerdo, ¿qué tan de acuerdo estás con que si se aumentara el precio del transporte este mejoraría en calidad?',
                required: true
            },
            { 
                number: 20, id: 'willingToPayIncrease', section: 'evaluation', type: 'text',
                label: '¿Cuánto estarías dispuesto a pagar en un incremento del costo del transporte (Pesos)?',
                required: true
            },
            { 
                number: 21, id: 'mobilityImprovements', section: 'evaluation', type: 'textarea',
                label: 'En tu opinión ¿qué mejorarías de la movilidad en la ciudad?',
                required: true
            }
        ]
    }
];
