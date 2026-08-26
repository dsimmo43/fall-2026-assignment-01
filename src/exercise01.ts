export function formatName(
  firstName: string,
  lastName: string,
  middleName?: string | null,
): string {
  if (middleName === null || middleName === undefined || middleName.trim() === '') {
    return `${lastName}, ${firstName}`;
  }
  return `${lastName}, ${firstName} ${middleName[0]}.`;
}
