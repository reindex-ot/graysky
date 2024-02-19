import { useMemo } from "react";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { CheckIcon } from "lucide-react-native";

import { GroupedList } from "~/components/grouped-list";
import { TransparentHeaderUntilScrolled } from "~/components/transparent-header";
import { useComposerState } from "~/lib/composer/state";
import { produce } from "~/lib/utils/produce";

// spoiler warning is currently disabled due to lack of support in the
// official app - can reenable once they implement it
// const SPOILER_WARNING = "spoiler";

export default function ContentWarningScreen() {
  const [{ labels }, setComposerState] = useComposerState();
  const { _ } = useLingui();

  const ADULT_CONTENT_WARNINGS = useMemo(
    () => [
      {
        label: "sexual",
        title: _(msg`Sexual content`),
        description: _(msg`This post contains pictures intended for adults.`),
      },
      {
        label: "nudity",
        title: _(msg`Nudity`),
        description: _(msg`This post contains artistic or non-erotic nudity.`),
      },
      {
        label: "porn",
        title: _(msg`Pornographic content`),
        description: _(
          msg`This post contains sexual activity or erotic nudity.`,
        ),
      },
    ],
    [_],
  );

  return (
    <TransparentHeaderUntilScrolled>
      <GroupedList
        groups={[
          {
            title: _(msg`Adult content`),
            options: ADULT_CONTENT_WARNINGS.map((warning) => ({
              title: warning.title,
              icon: labels.includes(warning.label) ? CheckIcon : "SPACE",
              onPress: () => {
                setComposerState(
                  produce((draft) => {
                    if (labels.includes(warning.label)) {
                      draft.labels = labels.filter(
                        (label) => label !== warning.label,
                      );
                    } else {
                      draft.labels.push(warning.label);
                    }
                  }),
                );
              },
            })),
            footer: ADULT_CONTENT_WARNINGS.find(({ label }) =>
              labels.includes(label),
            )?.description,
          },
          // {
          //   title: "Spoilers",
          //   options: [
          //     {
          //       title: "Spoilers",
          //       icon: labels.includes(SPOILER_WARNING) ? CheckIcon : "SPACE",
          //       onPress: () => {
          //         setComposerState(
          //           produce((draft) => {
          //             if (labels.includes(SPOILER_WARNING)) {
          //               draft.labels = labels.filter(
          //                 (label) => label !== SPOILER_WARNING,
          //               );
          //             } else {
          //               draft.labels.push(SPOILER_WARNING);
          //             }
          //           }),
          //         );
          //       },
          //     },
          //   ],
          //   footer: labels.includes(SPOILER_WARNING)
          //     ? "This content contains discussion about film, TV, etc which gives away plot points."
          //     : undefined,
          // },
        ]}
      />
    </TransparentHeaderUntilScrolled>
  );
}
