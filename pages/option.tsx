import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import "semantic-ui-css/semantic.min.css"
import { Dropdown, Select } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })
const colors = ['blue', 'green', 'red', 'black', 'silver', 'gold'];

const artOptions = [
    { label: 'アニメ', value: 'anime screencap' },
    { label: '水彩画', value: 'watercolor drawing' },
    { label: 'アナログ', value: 'traditional media' },
];

const monokuroOptions = [
    { label: '線画', value: 'lineart' },
    { label: 'グレー', value: 'greyscale' },
];

const monsterOptions = [
    { label: 'ドラゴン', value: 'dragon' },
    { label: 'フェニックス', value: 'phoenix' },
    { label: 'ペガサス', value: 'Pegasus' },
    { label: 'ケルベロス', value: 'cerberus' },
    { label: 'キメラ', value: 'chimera' },
];

const promptOptions = [
    {
        label: 'いい感じなイラスト:女性',
        value: `blush, glossy js-hair hair, gemstone js-eyes anime eyes, look at viewer, highres, waifu, extremely detailed CG, ${artOptions[0].value}, unity, 8k, wallpaper, beautiful, full frame, crisp detail{--waifu}`,
    },
    {
        label: 'いい感じなイラスト:男性',
        value: `ikemen, man, glossy js-hair hair, gemstone js-eyes anime eyes, look at viewer, highres, waifu, extremely detailed CG, ${artOptions[0].value}, unity, 8k, wallpaper, beautiful, full frame, crisp detail{--waifu}`,
    },
    {
        label: 'ファンタジーなイラスト:女性',
        value:
            'japanese anime of a beaultiful girl, fantasy costume, fantasy background, beautiful composition, cinematic lighting, pixiv, light novel, digital painting, extremely detailed, sharp focus, ray tracing, 8k, cinematic postprocessing',
    },
    {
        label: 'ファンタジーなイラスト:男性',
        value:
            'ikemen, man, fantasy costume, fantasy background, beautiful composition, cinematic lighting, pixiv, light novel, digital painting, extremely detailed, sharp focus, ray tracing, 8k, cinematic postprocessing',
    },
    {
        label: 'スケッチ',
        value: `${monokuroOptions[0].value}, anime girl, pixiv, waifu, anime cover art, anime portrait girl, character art portrait, trending on artstation, realistic shaded{--waifu}`,
    },
    {
        label: '神話上の生き物',
        value: `${monsterOptions[0].value}, whole body, fantasy background, beautiful composition, cinematic lighting, digital painting, extremely detailed, sharp focus, ray tracing, 8k, cinematic postprocessing`,
    },
    {
        label: 'レトロな戦争',
        value: 'Dieselpunk zeppelin, concept art, highly detailed, artstation, trending, feng zhu, shaddy safadi, noah bradley, tyler edlin, jordan grimmer, darek zabrocki, neil blevins, tuomas korpi',
    },
    {
        label: 'サイバーパンクな戦争',
        value:
            'Cyberpunk world war 3, cinematic composition, a fantasy digital painting by greg rutkowski and james gurney, trending on artstation, highly detailed, hyperrealistic, realistic, photorealistic, dynamic lighting, highly detailed, cinematic landscape, studio landscape, studio lighting',
    },
    {
        label: '一から文章を書く',
        value: '',
    },
];

const secondOptions: { [key: string]: { label: string; value: string }[] } = {
    神話上の生き物: monsterOptions,
    スケッチ: monokuroOptions,
    'いい感じなイラスト:女性': artOptions,
    'いい感じなイラスト:男性': artOptions,
};

const imgNumOptions = [
    { label: '1枚', value: 1 },
    { label: '2枚', value: 2 },
    { label: '3枚', value: 3 },
    { label: '4枚', value: 4 },
    { label: '5枚', value: 5 },
];

const quarityOptions = [
    { label: '2分（クオリティ高）', value: 50 },
    { label: '1分（クオリティ低）', value: 15 },
];

const fillterOptions = [
    { label: 'アップする（センシティブな画像は黒画像に変換されます）', value: '' },
    { label: 'アップせずに生成のみ行う', value: '{--no-filter}' },
];

const Home: NextPage = () => {
    const [splitNum, setSplitNum] = useState<number>(3);
    const router = useRouter();
    const num = router.query.num
    const [createError, setCreateError] = useState(null);
    const [isCreateLoaded, setCreateIsLoaded] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [isFetchLoaded, setFetchIsLoaded] = useState(true);
    const [fetchItems, setFetchItems] = useState<string[]>([]);
    const [modelImage, setModelImage] = useState('/img/dummy-image-square.jpeg');
    const [selectImgId, setSelectImgId] = useState('');
    // 画像の取得をONCE_FETCH_NUMずつにするためのstate
    const [fetchCount, setFetchCount] = useState(0);

    let initPrompt = promptOptions[0].value;
    const hairColor = colors[Math.floor(Math.random() * colors.length)];
    const eyesColor = colors[Math.floor(Math.random() * colors.length)];
    initPrompt = initPrompt.replace('js-hair', hairColor);
    initPrompt = initPrompt.replace('js-eyes', eyesColor);
    const [prompt, setPrompt] = useState(initPrompt);
    const [promptLabel, setPromptLabel] = useState(promptOptions[0].label);
    const [imgNum, setimgNum] = useState(imgNumOptions[0].value);
    const [quartiy, setQuarity] = useState(quarityOptions[0].value);
    const [filter, setFilter] = useState(fillterOptions[0].value);
    if (num === undefined) {
        return <p>Error</p>;
    }
    return (
        <div
            className={styles.main}
        >
            <Link href="/">
                <h1>バズパズ</h1>
            </Link>
            <p>作りたい画像を英文で表してください</p>
            <Head>
                <title>絵トリス | 画像生成ai</title>
                <meta name='keywords' content='絵トリス中本大貴' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className={styles.container}>
                <label>文章を自動生成:</label>
                <Select
                    options={promptOptions}
                // onChange={(promptValue, label) => {
                //     if (typeof promptValue === 'number') return;
                //     const hairColor = colors[Math.floor(Math.random() * colors.length)];
                //     const eyesColor = colors[Math.floor(Math.random() * colors.length)];
                //     promptValue = promptValue.replace('js-hair', hairColor);
                //     promptValue = promptValue.replace('js-eyes', eyesColor);

                //     if (label) {
                //         setPromptLabel(label);

                //         // すでに2ndOptionsが選択されていたらその値に書き換える処理
                //         const secondValue = secondOptionRef.current?.value;

                //         if (!secondValue || label in secondOptions === false) return setPrompt(promptValue);

                //         // 変更後のpromptの中に変更後のsecondOptionsがあればbeforeに代入される
                //         let before = '';
                //         // 変更前のsecondOptionsValueが変更後のsecondOptionsの中にあればtrue
                //         let hasOption = false;
                //         for (const secondOption of secondOptions[label]) {
                //             if (promptValue.indexOf(secondOption.value) !== -1) {
                //                 before = secondOption.value;
                //             }

                //             if (secondOption.value === secondValue) {
                //                 hasOption = true;
                //             }
                //         }

                //         if (before !== '' && hasOption) {
                //             promptValue = promptValue.replace(before, secondValue);
                //         }
                //     }

                //     setPrompt(promptValue);
                // }}
                />
                <p></p>
                <label>モンスター</label>
                <Select
                    options={monsterOptions}
                />
                <p></p>
                <label>描き方</label>
                <Select
                    options={monokuroOptions}
                />
                <p></p>
                <label>テイスト</label>
                <Select
                    options={artOptions}
                />
                <div >
                    <label>作成する画像の枚数:</label>
                    <Select
                        options={imgNumOptions}
                        onChange={(value) => {
                            setimgNum(Number(value));
                        }}
                    />
                </div>
                <div>
                    <label>一枚あたりの所要時間:</label>
                    <Select
                        options={quarityOptions}
                        onChange={(value) => {
                            setQuarity(Number(value));
                        }}
                    />
                </div>
                <div>
                    <label>Others Imagesにアップするか:</label>
                    <Select
                        options={fillterOptions}
                        onChange={(value) => {
                            setFilter(String(value));
                        }}
                    />
                </div>

                <textarea
                    inputValue={prompt}
                    onChange={(value) => {
                        setPrompt(value);
                    }}
                />

                <p>{num}</p>

                <p></p>
                <a href={'/cat?num=' + num}>
                    スタート
                </a>
            </div>
        </div>
        // </div >
    );
};
export default Home;
