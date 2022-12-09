export class Todo {
  public readonly id: string
  public readonly name: string
  public readonly description?: string
  public readonly startAt: Date

  private constructor(props: Todo) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.startAt = props.startAt
  }

  public static new(props: Todo) {
    const id = props.id ?? window.crypto.randomUUID()

    if (!props.name || props.name.length < 3) {
      throw new Error("O name do Todo deve ter ao menos 3 caracteres.")
    }

    if (!props.startAt) {
      throw new Error(
        "Por favor, informe uma data de início válida para seu Todo."
      )
    }

    return new Todo({
      id,
      name: props.name,
      startAt: props.startAt,
      description: props.description,
    })
  }
}
