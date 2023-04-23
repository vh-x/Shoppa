export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'price',
      media: 'image',
    },
    prepare(selection: {title: string; subtitle: number; media: string}) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: '$' + subtitle,
        media: media[0],
      }
    },
  },
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 90,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'details',
      title: 'Details',
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
      name: 'numReviews',
      title: 'Number of Reviews',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
    },
  ],
}
