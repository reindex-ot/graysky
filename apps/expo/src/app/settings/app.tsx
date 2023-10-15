import { Alert, Switch } from "react-native";

import { GroupedList } from "~/components/grouped-list";
import { useAppPreferences } from "~/lib/hooks/preferences";

export default function AppSettings() {
  const [appPrefs, setAppPrefs] = useAppPreferences();

  return (
    <GroupedList
      groups={[
        {
          title: "General",
          options: [
            {
              title: "Manually sort non-favourite feeds",
              action: (
                <Switch
                  value={appPrefs.sortableFeeds}
                  onValueChange={(sortableFeeds) =>
                    setAppPrefs({ sortableFeeds })
                  }
                  accessibilityLabel="Allows you to manually sort non-favourite feeds in the feeds tab"
                />
              ),
            },
            {
              title: "Show each notification individually",
              action: (
                <Switch
                  value={!appPrefs.groupNotifications}
                  onValueChange={(value) =>
                    setAppPrefs({ groupNotifications: !value })
                  }
                  accessibilityLabel="Show each notification individually in the notification tab"
                />
              ),
            },
          ],
        },
        {
          title: "Accessibility",
          options: [
            {
              title: "Disable haptics",
              action: (
                <Switch
                  value={!appPrefs.haptics}
                  onValueChange={(disableHaptics) => {
                    const haptics = !disableHaptics;
                    setAppPrefs({ haptics });
                    if (!haptics) {
                      Alert.alert(
                        "Haptics disabled",
                        "The app won't trigger haptic feedback manually anymore, however some UI elements may still have haptics. If you are sensitive to this, please disable haptics in your device's system accessibility settings.",
                      );
                    }
                  }}
                  accessibilityLabel="Disable haptics (vibrations)"
                />
              ),
            },
            {
              title: "Disable GIF autoplay",
              action: (
                <Switch
                  value={!appPrefs.gifAutoplay}
                  onValueChange={(disableGifAutoplay) => {
                    const gifAutoplay = !disableGifAutoplay;
                    setAppPrefs({ gifAutoplay });
                  }}
                  accessibilityLabel="Disable GIF autoplay"
                />
              ),
            },
          ],
        },
      ]}
    />
  );
}
