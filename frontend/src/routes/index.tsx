import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // check if logged in
    throw redirect({
      to: '/home'
    })
  }
})
