#!/bin/bash

MODULES=(
	"@react-native-async-storage/async-storage"
	# "@react-native-community/masked-view"
	# "@react-native-community/camera-roll"
	# "@react-native-community/datetimepicker"
	# "@react-native-community/netinfo"
	# "expo-apple-authentication"
	"expo-application"
	"expo-asset"
	# "expo-auth-session"
	# "expo-av"
	# "expo-background-fetch"
	# "expo-barcode-scanner"
	# "expo-battery"
	# "expo-blur"
	# "expo-branch"
	# "expo-brightness"
	# "expo-build-properties"
	# "expo-calendar"
	# "expo-camera"
	# "expo-cellular"
	# "expo-checkbox"
	# "expo-clipboard"
	"expo-constants"
	# "expo-contacts"
	# "expo-crypto"
	# "expo-dev-client-components"
	"expo-dev-client"
	# "expo-dev-launcher"
	# "expo-dev-menu-interface"
	# "expo-dev-menu"
	"expo-device"
	# "expo-document-picker"
	# "expo-eas-client"
	# "expo-face-detector"
	# "expo-file-system"
	"expo-font"
	# "expo-gl"
	# "expo-haptics"
	# "expo-image-loader"
	# "expo-image-manipulator"
	# "expo-image-picker"
	# "expo-image"
	# "expo-in-app-purchases"
	# "expo-insights"
	# "expo-intent-launcher"
	# "expo-json-utils"
	# "expo-keep-awake"
	# "expo-linear-gradient"
	# "expo-linking"
	# "expo-local-authentication"
	# "expo-localization"
	# "expo-location"
	# "expo-mail-composer"
	# "expo-manifests"
	# "expo-maps"
	# "expo-media-library"
	# "expo-module-scripts"
	# "expo-module-template-local"
	# "expo-module-template"
	# "expo-modules-autolinking"
	# "expo-modules-core"
	# "expo-modules-test-core"
	# "expo-navigation-bar"
	# "expo-network-addons"
	# "expo-network"
	# "expo-notifications"
	# "expo-permissions"
	# "expo-print"
	# "expo-processing"
	# "expo-random"
	# "expo-router"
	# "expo-screen-capture"
	# "expo-screen-orientation"
	# "expo-secure-store"
	# "expo-sensors"
	# "expo-sharing"
	# "expo-sms"
	# "expo-speech"
	"expo-splash-screen"
	# "expo-sqlite"
	# "expo-standard-web-crypto"
	"expo-status-bar"
	# "expo-store-review"
	# "expo-structured-headers"
	"expo-system-ui"
	# "expo-task-manager"
	# "expo-test-runner"
	# "expo-tracking-transparency"
	# "expo-updates-interface"
	"expo-updates"
	# "expo-video-thumbnails"
	"expo-web-browser"
	"react-native-gesture-handler"
	# "react-native-purchases"
	"react-native-reanimated"
	"react-native-safe-area-context"
	"react-native-screens"
	"react-native-svg"
	"react-native-webview"
)

expo install ${MODULES[@]}
