const colors = ['blue', 'green', 'red', 'black', 'silver', 'gold']

const artOptions = [
  { label: 'アニメ', value: 'anime screencap' },
  { label: '水彩画', value: 'watercolor drawing' },
  { label: 'アナログ', value: 'traditional media' }
]

const monokuroOptions = [
  { label: '線画', value: 'lineart' },
  { label: 'グレー', value: 'greyscale' }
]

const monsterOptions = [
  { label: 'ドラゴン', value: 'dragon' },
  { label: 'フェニックス', value: 'phoenix' },
  { label: 'ペガサス', value: 'Pegasus' },
  { label: 'ケルベロス', value: 'cerberus' },
  { label: 'キメラ', value: 'chimera' }
]

type PromptOptions = {
  label: string
  prompt: string
  selectReplaceOptions?: {
    originString: string
    options: {
      label: string
      value: string
    }[]
  }[]
  rondomReplaceOptions?: {
    originString: string
    options: string[]
  }[]
}[]

export const promptOptions: PromptOptions = [
  {
    label: '自分で書く',
    prompt: ''
  },
  {
    label: 'いい感じなイラスト:女性',
    prompt: `((masterpiece,best quality)),1girl, solo, animal ears, rabbit, barefoot, knees up, dress, sitting, rabbit ears, short sleeves, looking at viewer, grass, short hair, smile, white hair, puffy sleeves, outdoors, puffy short sleeves, bangs, on ground, full body, animal, white dress, sunlight, brown eyes, dappled sunlight, day, depth of field`,
    // prompt: `blush, glossy <js-hair> hair, gemstone <js-eyes> anime eyes, look at viewer, highres, waifu, extremely detailed CG, <js-art>, unity, 8k, wallpaper, beautiful, full frame, crisp detail<--waifu>`,
    selectReplaceOptions: [
      {
        originString: '<js-art>',
        options: artOptions
      }
    ],
    rondomReplaceOptions: [
      {
        originString: '<js-hair>',
        options: colors
      },
      {
        originString: '<js-eyes>',
        options: colors
      }
    ]
  },
  {
    label: 'いい感じなイラスト:男性',
    prompt: `ikemen, man, glossy <js-hair> hair, gemstone <js-eyes> anime eyes, look at viewer, highres, waifu, extremely detailed CG, <js-art>, unity, 8k, wallpaper, beautiful, full frame, crisp detail<--waifu>`,
    selectReplaceOptions: [
      {
        originString: '<js-art>',
        options: artOptions
      }
    ],
    rondomReplaceOptions: [
      {
        originString: '<js-hair>',
        options: colors
      },
      {
        originString: '<js-eyes>',
        options: colors
      }
    ]
  },
  {
    label: 'ファンタジーなイラスト:女性',
    prompt:
      'japanese anime of a beaultiful girl, fantasy costume, fantasy background, beautiful composition, cinematic lighting, pixiv, light novel, digital painting, extremely detailed, sharp focus, ray tracing, 8k, cinematic postprocessing'
  },
  {
    label: 'ファンタジーなイラスト:男性',
    prompt:
      'ikemen, man, fantasy costume, fantasy background, beautiful composition, cinematic lighting, pixiv, light novel, digital painting, extremely detailed, sharp focus, ray tracing, 8k, cinematic postprocessing'
  },
  {
    label: 'スケッチ',
    prompt: `<js-monokuro>, anime girl, pixiv, waifu, anime cover art, anime portrait girl, character art portrait, trending on artstation, realistic shaded<--waifu>`,
    selectReplaceOptions: [
      {
        originString: '<js-monokuro>',
        options: monokuroOptions
      }
    ]
  },
  {
    label: '神話上の生き物',
    prompt: `<js-monster>, whole body, fantasy background, beautiful composition, cinematic lighting, digital painting, extremely detailed, sharp focus, ray tracing, 8k, cinematic postprocessing`,
    selectReplaceOptions: [
      {
        originString: '<js-monster>',
        options: monsterOptions
      }
    ]
  },
  {
    label: 'レトロな戦争',
    prompt:
      'Dieselpunk zeppelin, concept art, highly detailed, artstation, trending, feng zhu, shaddy safadi, noah bradley, tyler edlin, jordan grimmer, darek zabrocki, neil blevins, tuomas korpi'
  },
  {
    label: 'サイバーパンクな戦争',
    prompt:
      'Cyberpunk world war 3, cinematic composition, a fantasy digital painting by greg rutkowski and james gurney, trending on artstation, highly detailed, hyperrealistic, realistic, photorealistic, dynamic lighting, highly detailed, cinematic landscape, studio landscape, studio lighting'
  }
]
