import Head from "next/head";

const HeadTags = () => (
  <>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta charSet='UTF-8' />
      <link rel='icon' href='/favicon.png' sizes='16*16' type='image/png' />

      <link rel='stylesheet' type='text/css' href='/listMessages.css' />

      <link rel='stylesheet' type='text/css' href='/styles.css' />
      <link rel='stylesheet' type='text/css' href='/nprogress.css' />
      <link
        async
        rel='stylesheet'
        href='//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.css'
      />
      <script
        async
        src='//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.js'
      ></script>
      <title>FrandZone-A place to chill</title>
    </Head>
  </>
);
export default HeadTags;
