export type TQuestionOption = { text: string; correct: boolean }
export type TQuestion = {
  title: string
  subtitle: string
  options: TQuestionOption[]
}
