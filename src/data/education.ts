export interface Education {
  id: string;
  institution: string;
  qualification: string;
  startDate: string | null;
  endDate: string | null;
  description: string;
}
// TODO: confirmar nombre formal de la titulación, institución y fechas.
// La captura menciona Instituto Santo Domingo; no inferir una credencial formal.
export const education: Education[] = [];
