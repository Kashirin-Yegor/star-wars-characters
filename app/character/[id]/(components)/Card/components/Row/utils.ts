export const formatHeight = (height: string) =>
  height === 'unknown' ? 'Неизвестно' : `${height} см`;
export const formatMass = (mass: string) =>
  mass === 'unknown' ? 'Неизвестно' : `${mass} кг`;

export const getGenderDisplay = (gender?: string) => {
  switch (gender?.toLowerCase()) {
    case 'male':
      return 'Мужской';
    case 'female':
      return 'Женский';
    case 'hermaphrodite':
      return 'Гермафродит';
    case 'n/a':
      return 'Неприменимо';
    default:
      return 'Неизвестно';
  }
};
