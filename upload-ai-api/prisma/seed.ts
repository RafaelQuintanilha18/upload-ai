import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
      title: 'YouTube Title',
      template: `Your role is to generate three titles for a YouTube video.

Below, you will receive a transcription of this video; use this transcription to generate the titles.
Below, you will also receive a list of titles; use this list as a reference for the titles to be generated.

The titles must be a maximum of 60 characters.
The titles should be catchy and attractive to maximize clicks.

Return ONLY the three titles in list format as shown below:
'''
- Title 1
- Title 2
- Title 3
'''

Transcription:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'YouTube Description',
      template: `Your role is to generate a concise description for a YouTube video.

Below, you will receive a transcription of this video; use this transcription to generate the description.

The description should be a maximum of 80 words in the first person and should contain the main points of the video.

Use captivating words that catch the reader's attention.

Additionally, at the end of the description, include a list of 3 to 10 hashtags in lowercase containing keywords from the video.

The return should follow the following format:
'''
Description.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcription:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Video Summary',
      template: `Your role is to generate a summary from the uploaded video, highlighting all the main concepts.

Below, you will receive a transcription of this video; use this transcription to generate the summary.

The summary should be well explained, needs to contain all the key points and be easy to understand.

'''
{transcription}
'''`.trim()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
