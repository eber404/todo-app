interface TodoProps {
  readonly id?: string
  readonly name: string
  readonly description?: string
  readonly createdAt?: Date
  readonly isDone?: boolean
}

export class Todo {
  public readonly id!: string
  public readonly name!: string
  public readonly description?: string
  public readonly createdAt!: Date
  public readonly isDone!: boolean

  private constructor(props: TodoProps) {
    Object.assign(this, props)
  }

  public static new(props: TodoProps) {
    if (!props.name || props.name.length < 3) {
      throw new Error("O name do Todo deve ter ao menos 3 caracteres.")
    }

    const isDone = typeof props.isDone === "undefined" ? false : props.isDone

    return new Todo({
      id: props.id ?? window.crypto.randomUUID(),
      name: props.name,
      description: props.description,
      createdAt: props.createdAt ?? new Date(),
      isDone,
    })
  }
}
