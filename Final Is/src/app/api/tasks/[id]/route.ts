import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Si el modelo Task no está disponible, devolver un error
    if (!db.task) {
      console.error('Task model not found in database client')
      return NextResponse.json(
        { error: 'Base de datos no disponible' },
        { status: 503 }
      )
    }

    const task = await db.task.findUnique({
      where: { id: params.id }
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    return NextResponse.json(
      { error: 'Error al obtener la tarea' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, priority } = body

    if (!title) {
      return NextResponse.json(
        { error: 'El título es obligatorio' },
        { status: 400 }
      )
    }

    // Si el modelo Task no está disponible, devolver un error
    if (!db.task) {
      console.error('Task model not found in database client')
      return NextResponse.json(
        { error: 'Base de datos no disponible' },
        { status: 503 }
      )
    }

    const existingTask = await db.task.findUnique({
      where: { id: params.id }
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      )
    }

    const task = await db.task.update({
      where: { id: params.id },
      data: {
        title,
        description: description || null,
        priority: priority || 'MEDIUM'
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la tarea' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { completed } = body

    if (typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'El campo completed es obligatorio y debe ser un booleano' },
        { status: 400 }
      )
    }

    // Si el modelo Task no está disponible, devolver un error
    if (!db.task) {
      console.error('Task model not found in database client')
      return NextResponse.json(
        { error: 'Base de datos no disponible' },
        { status: 503 }
      )
    }

    const existingTask = await db.task.findUnique({
      where: { id: params.id }
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      )
    }

    const task = await db.task.update({
      where: { id: params.id },
      data: { completed }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error patching task:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la tarea' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Si el modelo Task no está disponible, devolver un error
    if (!db.task) {
      console.error('Task model not found in database client')
      return NextResponse.json(
        { error: 'Base de datos no disponible' },
        { status: 503 }
      )
    }

    const existingTask = await db.task.findUnique({
      where: { id: params.id }
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      )
    }

    await db.task.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Tarea eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Error al eliminar la tarea' },
      { status: 500 }
    )
  }
}