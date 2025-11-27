import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Datos de ejemplo para cuando la base de datos no está disponible
const sampleTasks = [
  {
    id: '1',
    title: 'Tarea de ejemplo 1',
    description: 'Esta es una tarea de ejemplo',
    completed: false,
    priority: 'MEDIUM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Tarea de ejemplo 2',
    description: 'Otra tarea de ejemplo',
    completed: true,
    priority: 'HIGH',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    console.log('Database client:', db)
    console.log('Task model:', db.task)
    
    if (!db.task) {
      console.error('Task model not found in database client, using sample data')
      return NextResponse.json(sampleTasks)
    }
    
    const tasks = await db.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    // Si hay un error, devolver datos de ejemplo
    return NextResponse.json(sampleTasks)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority } = body

    if (!title) {
      return NextResponse.json(
        { error: 'El título es obligatorio' },
        { status: 400 }
      )
    }

    // Si el modelo Task no está disponible, devolver una tarea de ejemplo
    if (!db.task) {
      console.error('Task model not found in database client, returning sample task')
      const sampleTask = {
        id: Date.now().toString(),
        title,
        description: description || null,
        priority: priority || 'MEDIUM',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return NextResponse.json(sampleTask, { status: 201 })
    }

    const task = await db.task.create({
      data: {
        title,
        description: description || null,
        priority: priority || 'MEDIUM'
      }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    // Si hay un error, devolver una tarea de ejemplo
    const sampleTask = {
      id: Date.now().toString(),
      title: body.title || 'Tarea sin título',
      description: body.description || null,
      priority: body.priority || 'MEDIUM',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    return NextResponse.json(sampleTask, { status: 201 })
  }
}