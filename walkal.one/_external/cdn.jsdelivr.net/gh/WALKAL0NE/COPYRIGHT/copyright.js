// httpsならreturn
if (location.protocol === 'https:') {
  const copyrightSet = () => {
    console.clear()
    const styles = `font-size: 16px;
        line-height: 1.4;
        padding-inline: 20px;
        color: #fff;
        background: #020016;
      `
    console.log(
      '%c' +
        'Created by WALKALONE : https://walkal.one \nTwitter : https://twitter.com/___walkalone',
      styles
    )
  }
  copyrightSet()

  setTimeout(() => {
    copyrightSet()
  }, 5000)
}