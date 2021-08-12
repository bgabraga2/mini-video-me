import electron from 'electron'
import Store, { Schema } from 'electron-store'
import chokidar from 'chokidar'
import { JSONSchemaType } from 'json-schema-typed'

const userPreferencesSchema: Schema<unknown> = {
  camera: {
    type: JSONSchemaType.Object,
    properties: {
      width: {
        type: JSONSchemaType.Number,
      },
      height: {
        type: JSONSchemaType.Number,
      },
      frameRate: {
        type: JSONSchemaType.Number,
      },
    },
  },
  anchor: {
    type: JSONSchemaType.Object,
    properties: {
      x: {
        type: JSONSchemaType.Number,
      },
      y: {
        type: JSONSchemaType.Number,
      },
    },
  },
  shortcuts: {
    type: JSONSchemaType.Object,
    properties: {
      moveCamera: {
        type: JSONSchemaType.Object,
        properties: {
          up: {
            type: JSONSchemaType.String,
          },
          down: {
            type: JSONSchemaType.String,
          },
          left: {
            type: JSONSchemaType.String,
          },
          right: {
            type: JSONSchemaType.String,
          },
        },
      },
      resizeCamera: {
        type: JSONSchemaType.Object,
        properties: {
          initial: {
            type: JSONSchemaType.String,
          },
          large: {
            type: JSONSchemaType.String,
          },
        },
      },
      hideCamera: {
        type: JSONSchemaType.String,
      },
    },
  },
  rounded: {
    type: JSONSchemaType.Boolean,
  },
  flipHorizontal: {
    type: JSONSchemaType.Boolean,
  },
  zoom: {
    type: JSONSchemaType.Number,
  },
  borderColorCss: {
    type: JSONSchemaType.String,
  },
}

export const userPreferences = new Store({
  schema: userPreferencesSchema,
  watch: true,
  clearInvalidConfig: true,
  defaults: {
    camera: {
      width: 1920,
      height: 1080,
      frameRate: 59.94,
    },
    anchor: {
      x: 0,
      y: 0,
    },
    shortcuts: {
      moveCamera: {
        up: 'Shift+Alt+CommandOrControl+Up',
        down: 'Shift+Alt+CommandOrControl+Down',
        left: 'Shift+Alt+CommandOrControl+Left',
        right: 'Shift+Alt+CommandOrControl+Right',
      },
      resizeCamera: {
        toggle: 'CommandOrControl+F11',
        initial: 'Shift+Alt+CommandOrControl+1',
        large: 'Shift+Alt+CommandOrControl+2',
      },
      hideCamera: 'Shift+Alt+CommandOrControl+3',
    },
    rounded: true,
    flipHorizontal: false,
    zoom: 1.1,
    borderColorCss: 'linear-gradient(160deg, #ebfa44, #bbefdb)',
  },
})

chokidar.watch(userPreferences.path).on('change', () => {
  electron.app.relaunch()
  electron.app.exit()
})
