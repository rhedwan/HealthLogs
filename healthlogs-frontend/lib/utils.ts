import { ToastActionElement } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@radix-ui/react-toast";
import { VariantProps } from "class-variance-authority";
import { ClassProp } from "class-variance-authority/types";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import {
  CSSProperties,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
  AriaRole,
  ToggleEventHandler,
  ClipboardEventHandler,
  CompositionEventHandler,
  FocusEventHandler,
  FormEventHandler,
  ReactEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  DragEventHandler,
  TouchEventHandler,
  PointerEventHandler,
  UIEventHandler,
  WheelEventHandler,
  AnimationEventHandler,
  TransitionEventHandler,
  PointerEvent,
  RefAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, format: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Array of month names
  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthNamesLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get short and full month names
  const shortMonthName = monthNamesShort[date.getMonth()];
  const longMonthName = monthNamesLong[date.getMonth()];

  // Replace format tokens with actual date parts, handling 'MMMM' and 'MMM' first to avoid conflicts
  let formattedDate = format
    .replace("DD", day)
    .replace("YYYY", String(year))
    .replace("YY", String(year).slice(-2));

  // Replace 'MMMM' before 'MMM' to ensure long month names are handled first
  formattedDate = formattedDate
    .replace("MMMM", longMonthName)
    .replace("MMM", shortMonthName)
    .replace("MM", month); // 'MM' is handled last to avoid interfering with 'MMM' or 'MMMM'

  return formattedDate;
}

// Return duration
export function timeDifference(startTime: string, endTime: string): number {
  // Parse the start and end times using moment with a generic date
  const startMoment = moment(startTime, "HH:mm");
  const endMoment = moment(endTime, "HH:mm");

  // Calculate the difference in minutes
  const differenceInMinutes = endMoment.diff(startMoment, "minutes");

  return differenceInMinutes;
}

export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function convertToDateTime(
  timeString: string,
  dateString: string | null = null
): Date {
  // If no dateString is provided, use the current date
  const date = dateString ? dateString : moment().format("YYYY-MM-DD");

  // Combine date and time into a single string
  const dateTimeString = `${date} ${timeString}`;

  // Parse the combined string using moment
  return moment(dateTimeString, "YYYY-MM-DD HH:mm").toDate();
}
export function extractTimeFromDate(dateString: string): string {
  // Create a Date object from the input string
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
export const formatDateChart = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const closeModalAndToast = (
  state: { message: string },
  action: (arg0: FormData) => void,
  toast: {
    ({
      ...props
    }: {
      open?: boolean | undefined;
      slot?: string | undefined;
      style?: CSSProperties | undefined;
      title?:
        | string
        | (string & ReactElement<any, string | JSXElementConstructor<any>>)
        | (string & Iterable<ReactNode>)
        | (string & ReactPortal)
        | (string & Promise<AwaitedReactNode>)
        | undefined;
      key?: Key | null | undefined;
      value?: string | number | readonly string[] | undefined;
      defaultChecked?: boolean | undefined;
      defaultValue?: string | number | readonly string[] | undefined;
      suppressContentEditableWarning?: boolean | undefined;
      suppressHydrationWarning?: boolean | undefined;
      accessKey?: string | undefined;
      autoFocus?: boolean | undefined;
      className?: string | undefined;
      contentEditable?:
        | (boolean | "true" | "false")
        | "inherit"
        | "plaintext-only"
        | undefined;
      contextMenu?: string | undefined;
      dir?: string | undefined;
      draggable?: (boolean | "true" | "false") | undefined;
      hidden?: boolean | undefined;
      lang?: string | undefined;
      nonce?: string | undefined;
      spellCheck?: (boolean | "true" | "false") | undefined;
      tabIndex?: number | undefined;
      translate?: "yes" | "no" | undefined;
      radioGroup?: string | undefined;
      role?: AriaRole | undefined;
      about?: string | undefined;
      content?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      rel?: string | undefined;
      resource?: string | undefined;
      rev?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;
      autoCapitalize?: string | undefined;
      autoCorrect?: string | undefined;
      autoSave?: string | undefined;
      color?: string | undefined;
      itemProp?: string | undefined;
      itemScope?: boolean | undefined;
      itemType?: string | undefined;
      itemID?: string | undefined;
      itemRef?: string | undefined;
      results?: number | undefined;
      security?: string | undefined;
      unselectable?: "on" | "off" | undefined;
      inputMode?:
        | "search"
        | "text"
        | "email"
        | "tel"
        | "url"
        | "numeric"
        | "none"
        | "decimal"
        | undefined;
      is?: string | undefined;
      popover?: "" | "auto" | "manual" | undefined;
      popoverTargetAction?: "toggle" | "show" | "hide" | undefined;
      popoverTarget?: string | undefined;
      onToggle?: ToggleEventHandler<HTMLLIElement> | undefined;
      onBeforeToggle?: ToggleEventHandler<HTMLLIElement> | undefined;
      inert?: boolean | undefined;
      tw?: string | undefined;
      "aria-activedescendant"?: string | undefined;
      "aria-atomic"?: (boolean | "true" | "false") | undefined;
      "aria-autocomplete"?: "list" | "none" | "inline" | "both" | undefined;
      "aria-braillelabel"?: string | undefined;
      "aria-brailleroledescription"?: string | undefined;
      "aria-busy"?: (boolean | "true" | "false") | undefined;
      "aria-checked"?: boolean | "true" | "false" | "mixed" | undefined;
      "aria-colcount"?: number | undefined;
      "aria-colindex"?: number | undefined;
      "aria-colindextext"?: string | undefined;
      "aria-colspan"?: number | undefined;
      "aria-controls"?: string | undefined;
      "aria-current"?:
        | boolean
        | "time"
        | "step"
        | "true"
        | "false"
        | "date"
        | "page"
        | "location"
        | undefined;
      "aria-describedby"?: string | undefined;
      "aria-description"?: string | undefined;
      "aria-details"?: string | undefined;
      "aria-disabled"?: (boolean | "true" | "false") | undefined;
      "aria-dropeffect"?:
        | "link"
        | "none"
        | "copy"
        | "execute"
        | "move"
        | "popup"
        | undefined;
      "aria-errormessage"?: string | undefined;
      "aria-expanded"?: (boolean | "true" | "false") | undefined;
      "aria-flowto"?: string | undefined;
      "aria-grabbed"?: (boolean | "true" | "false") | undefined;
      "aria-haspopup"?:
        | boolean
        | "dialog"
        | "menu"
        | "true"
        | "false"
        | "grid"
        | "listbox"
        | "tree"
        | undefined;
      "aria-hidden"?: (boolean | "true" | "false") | undefined;
      "aria-invalid"?:
        | boolean
        | "true"
        | "false"
        | "grammar"
        | "spelling"
        | undefined;
      "aria-keyshortcuts"?: string | undefined;
      "aria-label"?: string | undefined;
      "aria-labelledby"?: string | undefined;
      "aria-level"?: number | undefined;
      "aria-live"?: "off" | "assertive" | "polite" | undefined;
      "aria-modal"?: (boolean | "true" | "false") | undefined;
      "aria-multiline"?: (boolean | "true" | "false") | undefined;
      "aria-multiselectable"?: (boolean | "true" | "false") | undefined;
      "aria-orientation"?: "horizontal" | "vertical" | undefined;
      "aria-owns"?: string | undefined;
      "aria-placeholder"?: string | undefined;
      "aria-posinset"?: number | undefined;
      "aria-pressed"?: boolean | "true" | "false" | "mixed" | undefined;
      "aria-readonly"?: (boolean | "true" | "false") | undefined;
      "aria-relevant"?:
        | "text"
        | "additions"
        | "additions removals"
        | "additions text"
        | "all"
        | "removals"
        | "removals additions"
        | "removals text"
        | "text additions"
        | "text removals"
        | undefined;
      "aria-required"?: (boolean | "true" | "false") | undefined;
      "aria-roledescription"?: string | undefined;
      "aria-rowcount"?: number | undefined;
      "aria-rowindex"?: number | undefined;
      "aria-rowindextext"?: string | undefined;
      "aria-rowspan"?: number | undefined;
      "aria-selected"?: (boolean | "true" | "false") | undefined;
      "aria-setsize"?: number | undefined;
      "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
      "aria-valuemax"?: number | undefined;
      "aria-valuemin"?: number | undefined;
      "aria-valuenow"?: number | undefined;
      "aria-valuetext"?: string | undefined;
      children?: ReactNode;
      dangerouslySetInnerHTML?: { __html: string | TrustedHTML } | undefined;
      onCopy?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCopyCapture?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCut?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCutCapture?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onPaste?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onPasteCapture?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCompositionEnd?: CompositionEventHandler<HTMLLIElement> | undefined;
      onCompositionEndCapture?:
        | CompositionEventHandler<HTMLLIElement>
        | undefined;
      onCompositionStart?: CompositionEventHandler<HTMLLIElement> | undefined;
      onCompositionStartCapture?:
        | CompositionEventHandler<HTMLLIElement>
        | undefined;
      onCompositionUpdate?: CompositionEventHandler<HTMLLIElement> | undefined;
      onCompositionUpdateCapture?:
        | CompositionEventHandler<HTMLLIElement>
        | undefined;
      onFocus?: FocusEventHandler<HTMLLIElement> | undefined;
      onFocusCapture?: FocusEventHandler<HTMLLIElement> | undefined;
      onBlur?: FocusEventHandler<HTMLLIElement> | undefined;
      onBlurCapture?: FocusEventHandler<HTMLLIElement> | undefined;
      onChange?: FormEventHandler<HTMLLIElement> | undefined;
      onChangeCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onBeforeInput?: FormEventHandler<HTMLLIElement> | undefined;
      onBeforeInputCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onInput?: FormEventHandler<HTMLLIElement> | undefined;
      onInputCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onReset?: FormEventHandler<HTMLLIElement> | undefined;
      onResetCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onSubmit?: FormEventHandler<HTMLLIElement> | undefined;
      onSubmitCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onInvalid?: FormEventHandler<HTMLLIElement> | undefined;
      onInvalidCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onLoad?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onError?: ReactEventHandler<HTMLLIElement> | undefined;
      onErrorCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onKeyDown?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyDownCapture?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyPress?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyPressCapture?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyUp?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyUpCapture?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onAbort?: ReactEventHandler<HTMLLIElement> | undefined;
      onAbortCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlay?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlayCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlayThrough?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlayThroughCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onDurationChange?: ReactEventHandler<HTMLLIElement> | undefined;
      onDurationChangeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onEmptied?: ReactEventHandler<HTMLLIElement> | undefined;
      onEmptiedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onEncrypted?: ReactEventHandler<HTMLLIElement> | undefined;
      onEncryptedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onEnded?: ReactEventHandler<HTMLLIElement> | undefined;
      onEndedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedData?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedDataCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedMetadata?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedMetadataCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadStart?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadStartCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onPause?: (() => void) | undefined;
      onPauseCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlay?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlayCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlaying?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlayingCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onProgress?: ReactEventHandler<HTMLLIElement> | undefined;
      onProgressCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onRateChange?: ReactEventHandler<HTMLLIElement> | undefined;
      onRateChangeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onResize?: ReactEventHandler<HTMLLIElement> | undefined;
      onResizeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeeked?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeekedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeeking?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeekingCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onStalled?: ReactEventHandler<HTMLLIElement> | undefined;
      onStalledCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onSuspend?: ReactEventHandler<HTMLLIElement> | undefined;
      onSuspendCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onTimeUpdate?: ReactEventHandler<HTMLLIElement> | undefined;
      onTimeUpdateCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onVolumeChange?: ReactEventHandler<HTMLLIElement> | undefined;
      onVolumeChangeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onWaiting?: ReactEventHandler<HTMLLIElement> | undefined;
      onWaitingCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onAuxClick?: MouseEventHandler<HTMLLIElement> | undefined;
      onAuxClickCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onClick?: MouseEventHandler<HTMLLIElement> | undefined;
      onClickCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onContextMenu?: MouseEventHandler<HTMLLIElement> | undefined;
      onContextMenuCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onDoubleClick?: MouseEventHandler<HTMLLIElement> | undefined;
      onDoubleClickCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onDrag?: DragEventHandler<HTMLLIElement> | undefined;
      onDragCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEnd?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEndCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEnter?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEnterCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragExit?: DragEventHandler<HTMLLIElement> | undefined;
      onDragExitCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragLeave?: DragEventHandler<HTMLLIElement> | undefined;
      onDragLeaveCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragOver?: DragEventHandler<HTMLLIElement> | undefined;
      onDragOverCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragStart?: DragEventHandler<HTMLLIElement> | undefined;
      onDragStartCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDrop?: DragEventHandler<HTMLLIElement> | undefined;
      onDropCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onMouseDown?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseDownCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseEnter?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseLeave?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseMove?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseMoveCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOut?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOutCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOver?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOverCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseUp?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseUpCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onSelect?: ReactEventHandler<HTMLLIElement> | undefined;
      onSelectCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onTouchCancel?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchCancelCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchEnd?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchEndCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchMove?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchMoveCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchStart?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchStartCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onPointerDown?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerDownCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerMove?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerMoveCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerUp?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerUpCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerCancel?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerCancelCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerEnter?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerLeave?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOver?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOverCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOut?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOutCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onGotPointerCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onGotPointerCaptureCapture?:
        | PointerEventHandler<HTMLLIElement>
        | undefined;
      onLostPointerCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onLostPointerCaptureCapture?:
        | PointerEventHandler<HTMLLIElement>
        | undefined;
      onScroll?: UIEventHandler<HTMLLIElement> | undefined;
      onScrollCapture?: UIEventHandler<HTMLLIElement> | undefined;
      onWheel?: WheelEventHandler<HTMLLIElement> | undefined;
      onWheelCapture?: WheelEventHandler<HTMLLIElement> | undefined;
      onAnimationStart?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationStartCapture?:
        | AnimationEventHandler<HTMLLIElement>
        | undefined;
      onAnimationEnd?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationEndCapture?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationIteration?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationIterationCapture?:
        | AnimationEventHandler<HTMLLIElement>
        | undefined;
      onTransitionEnd?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionEndCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      onTransitionCancel?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionCancelCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      onTransitionRun?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionRunCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      onTransitionStart?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionStartCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      asChild?: boolean | undefined;
      type?: "foreground" | "background" | undefined;
      duration?: number | undefined;
      onEscapeKeyDown?: ((event: KeyboardEvent) => void) | undefined;
      onResume?: (() => void) | undefined;
      onSwipeStart?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      onSwipeMove?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      onSwipeCancel?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      onSwipeEnd?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      defaultOpen?: boolean | undefined;
      onOpenChange?: ((open: boolean) => void) | undefined;
      forceMount?: true | undefined;
      action?: ToastActionElement | undefined;
      variant?: "default" | "destructive" | null | undefined;
      description?: ReactNode;
    }): {
      id: string;
      dismiss: () => void;
      update: (
        props: Omit<
          Omit<ToastProps & RefAttributes<HTMLLIElement>, "ref"> &
            VariantProps<
              (
                props?:
                  | ({
                      variant?: "default" | "destructive" | null | undefined;
                    } & ClassProp)
                  | undefined
              ) => string
            > &
            RefAttributes<HTMLLIElement>,
          "ref"
        > & {
          id: string;
          title?: ReactNode;
          description?: ReactNode;
          action?: ToastActionElement | undefined;
        }
      ) => void;
    };
    ({
      ...props
    }: {
      open?: boolean | undefined;
      slot?: string | undefined;
      style?: CSSProperties | undefined;
      title?:
        | string
        | (string & ReactElement<any, string | JSXElementConstructor<any>>)
        | (string & Iterable<ReactNode>)
        | (string & ReactPortal)
        | (string & Promise<AwaitedReactNode>)
        | undefined;
      key?: Key | null | undefined;
      value?: string | number | readonly string[] | undefined;
      defaultChecked?: boolean | undefined;
      defaultValue?: string | number | readonly string[] | undefined;
      suppressContentEditableWarning?: boolean | undefined;
      suppressHydrationWarning?: boolean | undefined;
      accessKey?: string | undefined;
      autoFocus?: boolean | undefined;
      className?: string | undefined;
      contentEditable?:
        | (boolean | "true" | "false")
        | "inherit"
        | "plaintext-only"
        | undefined;
      contextMenu?: string | undefined;
      dir?: string | undefined;
      draggable?: (boolean | "true" | "false") | undefined;
      hidden?: boolean | undefined;
      lang?: string | undefined;
      nonce?: string | undefined;
      spellCheck?: (boolean | "true" | "false") | undefined;
      tabIndex?: number | undefined;
      translate?: "yes" | "no" | undefined;
      radioGroup?: string | undefined;
      role?: AriaRole | undefined;
      about?: string | undefined;
      content?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      rel?: string | undefined;
      resource?: string | undefined;
      rev?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;
      autoCapitalize?: string | undefined;
      autoCorrect?: string | undefined;
      autoSave?: string | undefined;
      color?: string | undefined;
      itemProp?: string | undefined;
      itemScope?: boolean | undefined;
      itemType?: string | undefined;
      itemID?: string | undefined;
      itemRef?: string | undefined;
      results?: number | undefined;
      security?: string | undefined;
      unselectable?: "on" | "off" | undefined;
      inputMode?:
        | "search"
        | "text"
        | "email"
        | "tel"
        | "url"
        | "numeric"
        | "none"
        | "decimal"
        | undefined;
      is?: string | undefined;
      popover?: "" | "auto" | "manual" | undefined;
      popoverTargetAction?: "toggle" | "show" | "hide" | undefined;
      popoverTarget?: string | undefined;
      onToggle?: ToggleEventHandler<HTMLLIElement> | undefined;
      onBeforeToggle?: ToggleEventHandler<HTMLLIElement> | undefined;
      inert?: boolean | undefined;
      tw?: string | undefined;
      "aria-activedescendant"?: string | undefined;
      "aria-atomic"?: (boolean | "true" | "false") | undefined;
      "aria-autocomplete"?: "list" | "none" | "inline" | "both" | undefined;
      "aria-braillelabel"?: string | undefined;
      "aria-brailleroledescription"?: string | undefined;
      "aria-busy"?: (boolean | "true" | "false") | undefined;
      "aria-checked"?: boolean | "true" | "false" | "mixed" | undefined;
      "aria-colcount"?: number | undefined;
      "aria-colindex"?: number | undefined;
      "aria-colindextext"?: string | undefined;
      "aria-colspan"?: number | undefined;
      "aria-controls"?: string | undefined;
      "aria-current"?:
        | boolean
        | "time"
        | "step"
        | "true"
        | "false"
        | "date"
        | "page"
        | "location"
        | undefined;
      "aria-describedby"?: string | undefined;
      "aria-description"?: string | undefined;
      "aria-details"?: string | undefined;
      "aria-disabled"?: (boolean | "true" | "false") | undefined;
      "aria-dropeffect"?:
        | "link"
        | "none"
        | "copy"
        | "execute"
        | "move"
        | "popup"
        | undefined;
      "aria-errormessage"?: string | undefined;
      "aria-expanded"?: (boolean | "true" | "false") | undefined;
      "aria-flowto"?: string | undefined;
      "aria-grabbed"?: (boolean | "true" | "false") | undefined;
      "aria-haspopup"?:
        | boolean
        | "dialog"
        | "menu"
        | "true"
        | "false"
        | "grid"
        | "listbox"
        | "tree"
        | undefined;
      "aria-hidden"?: (boolean | "true" | "false") | undefined;
      "aria-invalid"?:
        | boolean
        | "true"
        | "false"
        | "grammar"
        | "spelling"
        | undefined;
      "aria-keyshortcuts"?: string | undefined;
      "aria-label"?: string | undefined;
      "aria-labelledby"?: string | undefined;
      "aria-level"?: number | undefined;
      "aria-live"?: "off" | "assertive" | "polite" | undefined;
      "aria-modal"?: (boolean | "true" | "false") | undefined;
      "aria-multiline"?: (boolean | "true" | "false") | undefined;
      "aria-multiselectable"?: (boolean | "true" | "false") | undefined;
      "aria-orientation"?: "horizontal" | "vertical" | undefined;
      "aria-owns"?: string | undefined;
      "aria-placeholder"?: string | undefined;
      "aria-posinset"?: number | undefined;
      "aria-pressed"?: boolean | "true" | "false" | "mixed" | undefined;
      "aria-readonly"?: (boolean | "true" | "false") | undefined;
      "aria-relevant"?:
        | "text"
        | "additions"
        | "additions removals"
        | "additions text"
        | "all"
        | "removals"
        | "removals additions"
        | "removals text"
        | "text additions"
        | "text removals"
        | undefined;
      "aria-required"?: (boolean | "true" | "false") | undefined;
      "aria-roledescription"?: string | undefined;
      "aria-rowcount"?: number | undefined;
      "aria-rowindex"?: number | undefined;
      "aria-rowindextext"?: string | undefined;
      "aria-rowspan"?: number | undefined;
      "aria-selected"?: (boolean | "true" | "false") | undefined;
      "aria-setsize"?: number | undefined;
      "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
      "aria-valuemax"?: number | undefined;
      "aria-valuemin"?: number | undefined;
      "aria-valuenow"?: number | undefined;
      "aria-valuetext"?: string | undefined;
      children?: ReactNode;
      dangerouslySetInnerHTML?: { __html: string | TrustedHTML } | undefined;
      onCopy?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCopyCapture?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCut?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCutCapture?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onPaste?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onPasteCapture?: ClipboardEventHandler<HTMLLIElement> | undefined;
      onCompositionEnd?: CompositionEventHandler<HTMLLIElement> | undefined;
      onCompositionEndCapture?:
        | CompositionEventHandler<HTMLLIElement>
        | undefined;
      onCompositionStart?: CompositionEventHandler<HTMLLIElement> | undefined;
      onCompositionStartCapture?:
        | CompositionEventHandler<HTMLLIElement>
        | undefined;
      onCompositionUpdate?: CompositionEventHandler<HTMLLIElement> | undefined;
      onCompositionUpdateCapture?:
        | CompositionEventHandler<HTMLLIElement>
        | undefined;
      onFocus?: FocusEventHandler<HTMLLIElement> | undefined;
      onFocusCapture?: FocusEventHandler<HTMLLIElement> | undefined;
      onBlur?: FocusEventHandler<HTMLLIElement> | undefined;
      onBlurCapture?: FocusEventHandler<HTMLLIElement> | undefined;
      onChange?: FormEventHandler<HTMLLIElement> | undefined;
      onChangeCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onBeforeInput?: FormEventHandler<HTMLLIElement> | undefined;
      onBeforeInputCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onInput?: FormEventHandler<HTMLLIElement> | undefined;
      onInputCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onReset?: FormEventHandler<HTMLLIElement> | undefined;
      onResetCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onSubmit?: FormEventHandler<HTMLLIElement> | undefined;
      onSubmitCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onInvalid?: FormEventHandler<HTMLLIElement> | undefined;
      onInvalidCapture?: FormEventHandler<HTMLLIElement> | undefined;
      onLoad?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onError?: ReactEventHandler<HTMLLIElement> | undefined;
      onErrorCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onKeyDown?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyDownCapture?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyPress?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyPressCapture?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyUp?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onKeyUpCapture?: KeyboardEventHandler<HTMLLIElement> | undefined;
      onAbort?: ReactEventHandler<HTMLLIElement> | undefined;
      onAbortCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlay?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlayCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlayThrough?: ReactEventHandler<HTMLLIElement> | undefined;
      onCanPlayThroughCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onDurationChange?: ReactEventHandler<HTMLLIElement> | undefined;
      onDurationChangeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onEmptied?: ReactEventHandler<HTMLLIElement> | undefined;
      onEmptiedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onEncrypted?: ReactEventHandler<HTMLLIElement> | undefined;
      onEncryptedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onEnded?: ReactEventHandler<HTMLLIElement> | undefined;
      onEndedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedData?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedDataCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedMetadata?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadedMetadataCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadStart?: ReactEventHandler<HTMLLIElement> | undefined;
      onLoadStartCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onPause?: (() => void) | undefined;
      onPauseCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlay?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlayCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlaying?: ReactEventHandler<HTMLLIElement> | undefined;
      onPlayingCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onProgress?: ReactEventHandler<HTMLLIElement> | undefined;
      onProgressCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onRateChange?: ReactEventHandler<HTMLLIElement> | undefined;
      onRateChangeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onResize?: ReactEventHandler<HTMLLIElement> | undefined;
      onResizeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeeked?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeekedCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeeking?: ReactEventHandler<HTMLLIElement> | undefined;
      onSeekingCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onStalled?: ReactEventHandler<HTMLLIElement> | undefined;
      onStalledCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onSuspend?: ReactEventHandler<HTMLLIElement> | undefined;
      onSuspendCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onTimeUpdate?: ReactEventHandler<HTMLLIElement> | undefined;
      onTimeUpdateCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onVolumeChange?: ReactEventHandler<HTMLLIElement> | undefined;
      onVolumeChangeCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onWaiting?: ReactEventHandler<HTMLLIElement> | undefined;
      onWaitingCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onAuxClick?: MouseEventHandler<HTMLLIElement> | undefined;
      onAuxClickCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onClick?: MouseEventHandler<HTMLLIElement> | undefined;
      onClickCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onContextMenu?: MouseEventHandler<HTMLLIElement> | undefined;
      onContextMenuCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onDoubleClick?: MouseEventHandler<HTMLLIElement> | undefined;
      onDoubleClickCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onDrag?: DragEventHandler<HTMLLIElement> | undefined;
      onDragCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEnd?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEndCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEnter?: DragEventHandler<HTMLLIElement> | undefined;
      onDragEnterCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragExit?: DragEventHandler<HTMLLIElement> | undefined;
      onDragExitCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragLeave?: DragEventHandler<HTMLLIElement> | undefined;
      onDragLeaveCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragOver?: DragEventHandler<HTMLLIElement> | undefined;
      onDragOverCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDragStart?: DragEventHandler<HTMLLIElement> | undefined;
      onDragStartCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onDrop?: DragEventHandler<HTMLLIElement> | undefined;
      onDropCapture?: DragEventHandler<HTMLLIElement> | undefined;
      onMouseDown?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseDownCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseEnter?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseLeave?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseMove?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseMoveCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOut?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOutCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOver?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseOverCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseUp?: MouseEventHandler<HTMLLIElement> | undefined;
      onMouseUpCapture?: MouseEventHandler<HTMLLIElement> | undefined;
      onSelect?: ReactEventHandler<HTMLLIElement> | undefined;
      onSelectCapture?: ReactEventHandler<HTMLLIElement> | undefined;
      onTouchCancel?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchCancelCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchEnd?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchEndCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchMove?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchMoveCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchStart?: TouchEventHandler<HTMLLIElement> | undefined;
      onTouchStartCapture?: TouchEventHandler<HTMLLIElement> | undefined;
      onPointerDown?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerDownCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerMove?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerMoveCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerUp?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerUpCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerCancel?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerCancelCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerEnter?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerLeave?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOver?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOverCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOut?: PointerEventHandler<HTMLLIElement> | undefined;
      onPointerOutCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onGotPointerCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onGotPointerCaptureCapture?:
        | PointerEventHandler<HTMLLIElement>
        | undefined;
      onLostPointerCapture?: PointerEventHandler<HTMLLIElement> | undefined;
      onLostPointerCaptureCapture?:
        | PointerEventHandler<HTMLLIElement>
        | undefined;
      onScroll?: UIEventHandler<HTMLLIElement> | undefined;
      onScrollCapture?: UIEventHandler<HTMLLIElement> | undefined;
      onWheel?: WheelEventHandler<HTMLLIElement> | undefined;
      onWheelCapture?: WheelEventHandler<HTMLLIElement> | undefined;
      onAnimationStart?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationStartCapture?:
        | AnimationEventHandler<HTMLLIElement>
        | undefined;
      onAnimationEnd?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationEndCapture?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationIteration?: AnimationEventHandler<HTMLLIElement> | undefined;
      onAnimationIterationCapture?:
        | AnimationEventHandler<HTMLLIElement>
        | undefined;
      onTransitionEnd?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionEndCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      onTransitionCancel?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionCancelCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      onTransitionRun?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionRunCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      onTransitionStart?: TransitionEventHandler<HTMLLIElement> | undefined;
      onTransitionStartCapture?:
        | TransitionEventHandler<HTMLLIElement>
        | undefined;
      asChild?: boolean | undefined;
      type?: "foreground" | "background" | undefined;
      duration?: number | undefined;
      onEscapeKeyDown?: ((event: KeyboardEvent) => void) | undefined;
      onResume?: (() => void) | undefined;
      onSwipeStart?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      onSwipeMove?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      onSwipeCancel?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      onSwipeEnd?:
        | ((
            event: { currentTarget: EventTarget & HTMLLIElement } & Omit<
              CustomEvent<{
                originalEvent: PointerEvent<Element>;
                delta: { x: number; y: number };
              }>,
              "currentTarget"
            >
          ) => void)
        | undefined;
      defaultOpen?: boolean | undefined;
      onOpenChange?: ((open: boolean) => void) | undefined;
      forceMount?: true | undefined;
      action?: ToastActionElement | undefined;
      variant?: "default" | "destructive" | null | undefined;
      description?: ReactNode;
    }): {
      id: string;
      dismiss: () => void;
      update: (
        props: Omit<
          Omit<ToastProps & RefAttributes<HTMLLIElement>, "ref"> &
            VariantProps<
              (
                props?:
                  | ({
                      variant?: "default" | "destructive" | null | undefined;
                    } & ClassProp)
                  | undefined
              ) => string
            > &
            RefAttributes<HTMLLIElement>,
          "ref"
        > & {
          id: string;
          title?: ReactNode;
          description?: ReactNode;
          action?: ToastActionElement | undefined;
        }
      ) => void;
    };
    (arg0: { title: string; description: string }): void;
  },
  open: any,
  setOpen: (arg0: boolean) => void,
  toastTitle: string,
  toastMessage: string,
  validityString: string
) => {
  if (state.message === validityString && open) {
    setOpen(false);
    toast({
      title: toastTitle,
      description: toastMessage,
    });
    // Reset the state after successful submission
    action(new FormData());
  }
};

export function calculateAge(birthDateInput: Date | string): number {
  // Convert the input to a Date object if it's a string
  const birthDate = new Date(birthDateInput);

  // Check if the conversion to Date was successful
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date input");
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Adjust the age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
export function getFileNameFromUrl(url: string): string {
  // Split the URL by "/" and get the last segment
  const parts = url.split("/");
  const fileName = parts[parts.length - 1]; // This will get the last part after the last "/"

  return fileName;
}
