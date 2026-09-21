'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/payload/seed'

export async function runServerSeed() {
  try {
    const payload = await getPayload({ config: configPromise })
    await seed(payload)
    return { success: true }
  } catch (error: any) {
    console.error('Seed error:', error)
    return { success: false, error: error.message }
  }
}
