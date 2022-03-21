import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'n65tvh6l',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skBa5YHe0gCDK4jInDeyV9MIVoJ8buU2LIXGbZ9JCKl3na0DBKXRgkJXotKS3Q4AgIaDHiCgVUAtTnbiJ73kkh7J4L8wB2vTzT0CGoqtfvY9fKs2ol9AAOpPmJ9tXV6ijkUAKtutt76MIQC4MtVhquITo0uvwz1SoGatyVIVz3nH7x6u9q5J',
  useCdn: false,
})
