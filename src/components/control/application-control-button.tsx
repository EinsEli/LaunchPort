/*
 * APPLICATION CONTROL BUTTON
 * -----------------
 * This component represents the button that starts and stops an application.
 */
"use client";

import { ApplicationState } from "@/types/application";
import { Application } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { TbArrowUpRight, TbLoader } from "react-icons/tb";
import { useEffect, useState } from "react";
import startContainers from "@/app/(server)/actions/docker/start-containers";
import stopContainers from "@/app/(server)/actions/docker/stop-containers";
import getContainersState from "@/app/(server)/actions/docker/get-containers-state";
import Link from "next/link";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";

export default function ApplicationControlButton({
	application,
	autoRefresh = false,
}: {
	application: Application;
	autoRefresh?: boolean;
}) {
	const [status, setStatus] = useState<ApplicationState>("loading");

	useEffect(() => {
		const fetchContainerState = () => {
			getContainersState(application.containerNames).then((response) => {
				if (response.code === "SUCCESS") {
					setStatus(response.status);
				} else {
					toast.error(
						response.message || "Failed to get application status",
						{ duration: Infinity, richColors: true },
					);
				}
			});
		};

		fetchContainerState();

		if (autoRefresh) {
			const interval = setInterval(fetchContainerState, 5000);
			return () => clearInterval(interval);
		}
	}, [application.containerNames, autoRefresh]);

	function handleClick() {
		switch (status) {
			case "exited":
				setStatus("starting");
				startContainers(application.containerNames).then((response) => {
					if (response.code === "SUCCESS") {
						toast.success(
							`${application.friendlyName} started successfully`,
						);
						setStatus("running");
					} else {
						toast.error(
							response.message || "Failed to start application",
							{
								richColors: true,
							},
						);
						setStatus("exited");
					}
				});
				break;
			case "running":
				setStatus("stopping");
				stopContainers(application.containerNames).then((response) => {
					if (response.code === "SUCCESS") {
						toast.success(
							`${application.friendlyName} stopped successfully`,
						);
						setStatus("exited");
					} else {
						toast.error(
							response.message || "Failed to stop application",
						);
						setStatus("running");
					}
				});
				break;
		}
	}

	return (
		<div className="relative h-10 w-full">
			<div className="flex items-center justify-center transition-all duration-500">
				<Button
					className="transition-size w-full duration-300 ease-in-out"
					disabled={
						status === "starting" ||
						status === "loading" ||
						status === "stopping"
					}
					variant={
						status === "running" || status === "stopping"
							? "destructive"
							: "default"
					}
					onClick={handleClick}
				>
					<span className="flex items-center gap-2">
						{(status === "starting" ||
							status === "loading" ||
							status === "stopping") && (
							<TbLoader className="animate-spin" />
						)}
						{status === "running"
							? "Stop"
							: status === "starting"
								? "Starting..."
								: status === "loading"
									? "Loading..."
									: status === "stopping"
										? "Stopping..."
										: "Start"}
					</span>
				</Button>
				<AnimatePresence>
					{status === "running" && (
						<motion.div
							initial={{ width: 0, filter: "blur(4px)" }}
							animate={{ width: "5rem", filter: "blur(0)" }}
							exit={{ width: 0, filter: "blur(4px)" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<Link href={`https://${application.urls[0]}`}>
								<Button
									variant="link"
									className="group flex w-24 flex-row gap-0.5 opacity-100 blur-none transition-opacity duration-300 ease-in-out"
								>
									Open
									<TbArrowUpRight />
								</Button>
							</Link>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
