
export interface SurveyFormData {
  // General Data
  age: string;
  occupation: string;
  occupationOther: string;
  sex: string;
  residence: string;
  residenceDetails: string;
  physicalImpediment: 'Si' | 'No' | '';
  physicalImpedimentDetails: string;

  // Transport Information
  travelToOtherPlace: 'Si' | 'No' | '';
  otherPlaceCityPart: string;
  otherPlaceReason: string;

  transportModes: { [key: string]: number | '' };

  transportWaitTime: string;
  
  alternateRoutes: 'Si' | 'No' | '';
  alternateRoutesCount: string;

  dailyTransports: string;
  peakHour: string;
  totalTimeInTransport: string;
  weeklyTransportCost: string;
  incomePercentageForTransport: string;

  transportAspectsRating: {
    comfort: number | '';
    cleanliness: number | '';
    security: number | '';
    punctuality: number | '';
    cost: number | '';
  };

  comfortFactorsRanking: { [key: string]: number | '' };
  cleanlinessFactorsRanking: { [key: string]: number | '' };
  securityFactorsRanking: { [key: string]: number | '' };
  punctualityFactorsRanking: { [key: string]: number | '' };
  
  incidentsLastYear: { [key: string]: { happened: boolean; times: number | '' } };

  delayFrequencyDuration: string;

  sufferingsLastYear: { [key: string]: { happened: boolean; times: number | '' } };
  
  costAspectsRating: {
    distance: number | '';
    cleanliness: number | '';
    security: number | '';
    punctuality: number | '';
    comfort: number | '';
    serviceQuality: number | '';
  };

  agreePriceIncreaseImprovesQuality: number | '';
  willingToPayIncrease: string;
  mobilityImprovements: string;
}
