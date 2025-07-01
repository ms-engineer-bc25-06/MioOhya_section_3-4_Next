import Image from 'next/image'
const Home = () => {
  return (
    <div>
      <h1>家計簿アプリへようこそ！</h1>
      <p>左のメニューから操作を選択してください。</p>

      <Image src="/good.png" alt="説明文" width={500} height={500} />
    </div>
  )
}

export default Home
