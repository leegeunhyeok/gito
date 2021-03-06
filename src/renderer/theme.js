import { remote } from 'electron'

const { systemPreferences, nativeTheme } = remote

const setOSTheme = () => {
  let theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  window.localStorage.theme = theme

  if ('__setTheme' in window) {
    window.__setTheme()
  }
}

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  setOSTheme
)

setOSTheme()
