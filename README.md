# ArchPort
__.



┌─────────────────┐
│     USERS       │
├─────────────────┤
│ _id: ObjectId   │◄──────┐
│ name: string    │       │
│ email: string   │       │ author
│ password: string│       │ (reference)
│ avatar?: string │       │
│ bio?: string    │       │
│ createdAt: Date │       │
└─────────────────┘       │
                          │
                          │
┌─────────────────────────┴─┐
│       PROJECTS            │
├───────────────────────────┤
│ _id: ObjectId             │
│ title: string             │
│ description: string       │
│ images: string[]          │
│ category: enum            │
│ author: ObjectId ─────────┘ (ссылка на User)
│ views: number             │
│ createdAt: Date           │
│ updatedAt: Date           │
└───────────────────────────┘

┌─────────────────────────┐
│      MESSAGES           │ (опционально для чата)
├─────────────────────────┤
│ _id: ObjectId           │
│ sender: ObjectId ───────┼──► User
│ receiver: ObjectId ─────┼──► User
│ text: string            │
│ isRead: boolean         │
│ createdAt: Date         │
└─────────────────────────┘