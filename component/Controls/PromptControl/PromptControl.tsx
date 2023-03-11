import { SelectControl } from '../SelectControl'
import { useMemo, useState } from 'react'
import { promptOptions } from './data'

const allReplace = (
  promptOption: typeof promptOptions[0],
  selectReplaceList: { originString: string; replaceString: string }[] | undefined
) => {
  let prompt = promptOption.prompt

  // rondomReplaceOptionsの内容でランダムに置換する
  promptOption.rondomReplaceOptions?.forEach((element) => {
    const replaceString = element.options[Math.floor(Math.random() * element.options.length)]

    prompt = prompt.replace(element.originString, replaceString)
  })

  // 選択した値をもとに置換する
  selectReplaceList?.forEach((element) => {
    prompt = prompt.replace(element.originString, element.replaceString)
  })

  return prompt
}

type PromptControlProps = { promptOptions: typeof promptOptions; changeCallback: (prompt: string) => void }

export const PromptControl: React.FC<PromptControlProps> = ({ promptOptions, changeCallback }) => {
  const firstPromptOptions = promptOptions.at(0)

  /**
   * いま選択されているpromptのstate。
   * 選択するたびにランダムでpromptの一部を置換するrandomReplaceと、選択するたびにその値に応じてpromptの一部を置換するselectReplaceOptionsの二種類がある。どちらも複数設定可能
   */
  const [nowPromptOption, setNowPromptOption] = useState(firstPromptOptions)

  /**
   *  例: promptの中にある、{js-art}をanime screencapに置換したいときは
   * [{
   *    originString : '{js-art}',
   *    replaceString:'screencap',
   * }]
   * というデータをもつstate。配列なので複数種類設定可能
   */
  const [nowSelectReplaceList, setNowSelectReplace] = useState<
    { originString: string; replaceString: string }[] | undefined
  >(
    firstPromptOptions?.selectReplaceOptions?.map((element) => {
      return { originString: element.originString, replaceString: element.options.at(0)?.value as string }
    })
  )

  useMemo(() => {
    if (!nowPromptOption) return

    const prompt = allReplace(nowPromptOption, nowSelectReplaceList)

    changeCallback(prompt)
  }, [nowPromptOption, nowSelectReplaceList])

  return (
    <>
      <SelectControl
        options={promptOptions.map((element) => {
          return { label: element.label, value: element.prompt }
        })}
        onChange={(promptValue, label) => {
          if (typeof promptValue === 'number') return
          if (!label) return

          const nowPromptOption = promptOptions.find((element) => element.label === label)
          if (!nowPromptOption) return

          setNowPromptOption(nowPromptOption)

          // 置換する文字リストを更新
          const nextSelectReplace = nowPromptOption.selectReplaceOptions?.map((element) => {
            return { originString: element.originString, replaceString: element.options.at(0)?.value as string }
          })

          setNowSelectReplace(nextSelectReplace)
        }}
      />
      {nowPromptOption?.selectReplaceOptions &&
        nowPromptOption?.selectReplaceOptions.map((selectReplaceOption) => {
          return (
            <SelectControl
              key={selectReplaceOption.originString}
              options={selectReplaceOption.options}
              onChange={(value) => {
                if (typeof value === 'number') return

                // 置換する文字リストを更新
                const nextSelectReplace = nowSelectReplaceList?.map((nowSelectReplace) => {
                  if (selectReplaceOption.originString === nowSelectReplace.originString) {
                    nowSelectReplace.replaceString = value
                  }
                  return nowSelectReplace
                })

                setNowSelectReplace(nextSelectReplace)
              }}
            />
          )
        })}
    </>
  )
}
