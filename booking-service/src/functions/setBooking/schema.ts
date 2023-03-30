export default {
  type: "object",
  properties: {
    user: { type: 'string' },
    isBooked: { type: 'boolean' }
  },
  required: ['user', 'isBooked']
} as const;
