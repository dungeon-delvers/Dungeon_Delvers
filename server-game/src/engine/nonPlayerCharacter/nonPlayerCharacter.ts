import { getNpcById } from "@/queries/nonPlayerCharacter"

export const loadNPCById = (id: number) => {
  return getNpcById(id);
}