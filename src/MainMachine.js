export const MainMachine = {
    "id": "Limited Video Choice",
    "initial": "VideosUnlockable",
    "states": {
      "VideosUnlockable": {
        "on": {
          "VideoUnlocked": {
            "target": "VideosLocked"
          }
        }
      },
      "VideosLocked": {
        "on": {
          "opened": {
            "target": "#Limited Video Choice.Video.Open"
          }
        }
      },
      "Video": {
        "initial": "Open",
        "states": {
          "Open": {
            "on": {
              "watched": {
                "target": "Question(s)"
              }
            }
          },
          "Question(s)": {
            "on": {
              "answered": {
                "target": "Done"
              }
            }
          },
          "Done": {
            "after": {
              "500": {
                "target": "#Limited Video Choice.VideosUnlockable",
                "actions": [],
                "internal": false
              }
            }
          }
        }
      }
    }
  }
  