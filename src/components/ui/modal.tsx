"use client";
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	PropsWithChildren,
} from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Drawer,
	DrawerContent,
	DrawerClose,
	DrawerNestedRoot,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { Drawer as DrawerPrimitive } from "vaul";
import useIsMobile from "@/hooks/useIsMobile";

export type ModalProps = React.HTMLAttributes<HTMLElement> &
	React.ComponentProps<typeof DrawerPrimitive.Root>;
export type ModalVariant =
	| "drawer"
	| "nested_drawer"
	| "alert_dialog"
	| "dialog"
	| "popover";

const VariantContext = createContext<{
	variant: ModalVariant;
	setVariant: React.Dispatch<React.SetStateAction<ModalVariant>>;
}>({
	variant: "dialog",
	setVariant: () => {},
});

export function Modal({
	desktop = "dialog",
	mobile = "drawer",
	children,
	...props
}: {
	desktop?: ModalVariant;
	mobile?: ModalVariant;
} & ModalProps) {
	const isMobile = useIsMobile();
	const [variant, setVariant] = useState<ModalVariant>(
		isMobile ? mobile : desktop,
	);

	useEffect(() => {
		setVariant(isMobile ? mobile : desktop);
	}, [isMobile, mobile, desktop]);

	const ModalComponent = {
		drawer: Drawer,
		nested_drawer: DrawerNestedRoot,
		alert_dialog: AlertDialog,
		dialog: Dialog,
		popover: Popover,
	}[variant];

	return (
		<VariantContext.Provider value={{ variant, setVariant }}>
			<ModalComponent {...props}>{children}</ModalComponent>
		</VariantContext.Provider>
	);
}

export function ModalHeader({
	children,
	...props
}: PropsWithChildren<ModalProps>) {
	const { variant } = useContext(VariantContext);
	const HeaderComponent = {
		drawer: DrawerHeader,
		nested_drawer: DrawerHeader,
		alert_dialog: AlertDialogHeader,
		dialog: DialogHeader,
		popover: "div",
	}[variant];

	return <HeaderComponent {...props}>{children}</HeaderComponent>;
}

export function ModalContent({
	children,
	...props
}: PropsWithChildren<ModalProps>) {
	const { variant } = useContext(VariantContext);
	const ContentComponent = {
		drawer: DrawerContent,
		nested_drawer: DrawerContent,
		alert_dialog: AlertDialogContent,
		dialog: DialogContent,
		popover: PopoverContent,
	}[variant];

	return (
		<ContentComponent className={props.className}>
			{children}
		</ContentComponent>
	);
}

export function ModalFooter({
	children,
	...props
}: PropsWithChildren<ModalProps>) {
	const { variant } = useContext(VariantContext);
	const FooterComponent = {
		drawer: DrawerFooter,
		nested_drawer: DrawerFooter,
		alert_dialog: AlertDialogFooter,
		dialog: DialogFooter,
		popover: "div",
	}[variant];

	return <FooterComponent {...props}>{children}</FooterComponent>;
}

export function ModalTitle({
	children,
	...props
}: PropsWithChildren<ModalProps>) {
	const { variant } = useContext(VariantContext);
	const TitleComponent = {
		drawer: DrawerTitle,
		nested_drawer: DrawerTitle,
		alert_dialog: AlertDialogTitle,
		dialog: DialogTitle,
		popover: "div",
	}[variant];

	return <TitleComponent {...props}>{children}</TitleComponent>;
}

export function ModalDescription({
	children,
	...props
}: PropsWithChildren<ModalProps>) {
	const { variant } = useContext(VariantContext);
	const DescriptionComponent = {
		drawer: DrawerDescription,
		nested_drawer: DrawerDescription,
		alert_dialog: AlertDialogDescription,
		dialog: DialogDescription,
		popover: "div",
	}[variant];

	return <DescriptionComponent {...props}>{children}</DescriptionComponent>;
}

export function ModalTrigger({
	children,
	...props
}: PropsWithChildren<ModalProps>) {
	const { variant } = useContext(VariantContext);
	const TriggerComponent = {
		drawer: DrawerTrigger,
		nested_drawer: DrawerTrigger,
		alert_dialog: AlertDialogTrigger,
		dialog: DialogTrigger,
		popover: PopoverTrigger,
	}[variant];

	return (
		<TriggerComponent asChild {...props}>
			{children}
		</TriggerComponent>
	);
}

export type ModalCloseProps = ModalProps & {
	buttonVariant?: ButtonProps["variant"];
	disabled?: boolean;
};

export function ModalClose({
	children,
	buttonVariant,
	...props
}: PropsWithChildren<ModalCloseProps>) {
	const { variant } = useContext(VariantContext);

	if (variant === "drawer") {
		return (
			<DrawerClose asChild>
				<Button variant={buttonVariant} {...props}>
					{children}
				</Button>
			</DrawerClose>
		);
	} else if (variant === "alert_dialog") {
		return <AlertDialogCancel {...props}>{children}</AlertDialogCancel>;
	} else if (variant === "popover") {
		return (
			<Button variant={buttonVariant} {...props}>
				{children}
			</Button>
		);
	} else {
		return (
			<DialogClose asChild>
				<Button variant={buttonVariant} {...props}>
					{children}
				</Button>
			</DialogClose>
		);
	}
}

export type ModalActionProps = ModalProps & ButtonProps;

export function ModalAction({
	children,
	...props
}: PropsWithChildren<ModalActionProps>) {
	return <Button {...props}>{children}</Button>;
}
