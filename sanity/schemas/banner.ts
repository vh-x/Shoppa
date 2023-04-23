export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  preview: {
    select: {
      title: 'largeText.en',
      media: 'image',
    },
  },
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'midText',
      title: 'MidText',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'ja',
          title: 'Japanese',
          type: 'string',
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'string',
        },
      ],
    },
    {
      name: 'largeText',
      title: 'LargeText1',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'ja',
          title: 'Japanese',
          type: 'string',
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'string',
        },
      ],
    },
  ],
}
