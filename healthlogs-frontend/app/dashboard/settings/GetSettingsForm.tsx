"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Calendar,
  FileText,
  Home,
  LogOutIcon,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/schema/User";
import { useFormState } from "react-dom";
import { State, updateUser } from "@/app/actions/user";
import { logout } from "@/app/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { PasswordState, updatePassword } from "@/app/actions/changePassword";
const initialState: State = { errors: {}, message: "", status: "" };
const initialPasswordState: PasswordState = { errors: {}, message: "" };

const GetSettingsForm = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [confirmation, setConfirmation] = useState(false);
  // @ts-ignore
  const [state, formAction] = useFormState(updateUser, initialState);
  const [passwordState, formActionPassword] = useFormState(
    // @ts-ignore
    updatePassword,
    initialPasswordState
  );
  const [photoPreview, setPhotoPreview] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (state.status === "Success") {
      toast({
        title: state.status,
        description: state.message,
      });
    } else if (state.status === "Error") {
      toast({
        title: state.status,
        description: state.message,
      });
    }
  }, [state]);
  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="h-12 w-12 mb-4 cursor-pointer">
                <AvatarImage src={user.photo} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex justify-center mr-8">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <LogOutIcon className="size-5" />
                      <p>Log Out</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <p className="text-center font-bold text-xl">Log Out?</p>
                    <div className="flex space-x-20 mt-7 justify-center items-center w-full">
                      <DialogClose>
                        <Button
                          className="flex items-center space-x-2 bg-red-500 text-white hover:bg-red-500 active:scale-50"
                          // onClick={() => logout()}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        className="flex items-center space-x-2 active:scale-50"
                        onClick={() => logout()}
                      >
                        confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Edit profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action={formAction}>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={photoPreview ? photoPreview : user.photo} />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button">
                  <Input
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  Upload picture
                </Button>
                {state?.errors?.photo && (
                  <p className="text-red-500 text-sm">
                    {state.errors.photo[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  readOnly
                  value={user.firstName}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  readOnly
                  value={user.lastName}
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  readOnly
                  name="position"
                  value={user.role}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone No</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  defaultValue={parseInt(user.phoneNumber)}
                />
                {state?.errors?.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {state.errors.phoneNumber[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" readOnly value={user.email} />
              </div>
              <div>
                <Label htmlFor="homeAddress">Address</Label>
                <Input
                  id="homeAddress"
                  type="text"
                  name="homeAddress"
                  defaultValue={user.homeAddress}
                />
                {state?.errors?.homeAddress && (
                  <p className="text-red-500 text-sm">
                    {state.errors.homeAddress[0]}
                  </p>
                )}
              </div>
              <Button className="w-full">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Change password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" action={formActionPassword}>
                <div>
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className={`${
                      passwordState?.errors?.currentPassword &&
                      "border border-red-500"
                    }`}
                  />
                  {passwordState?.errors?.currentPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordState.errors.currentPassword[0]}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">New password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className={`${
                      passwordState?.errors?.password && "border border-red-500"
                    }`}
                  />
                  {passwordState?.errors?.password && (
                    <p className="text-red-500 text-sm">
                      {passwordState.errors.password[0]}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="passwordConfirm">New password</Label>
                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    className={`${
                      passwordState?.errors?.passwordConfirm &&
                      "border border-red-500"
                    }`}
                  />
                  {passwordState?.errors?.passwordConfirm && (
                    <p className="text-red-500 text-sm">
                      {passwordState.errors.passwordConfirm[0]}
                    </p>
                  )}
                </div>
                {!confirmation && (
                  <Button
                    type="button"
                    onClick={() => setConfirmation(true)}
                    className="w-full"
                  >
                    Change password
                  </Button>
                )}
                {confirmation && (
                  <div className="flex items-center justify-center space-x-6">
                    <Button
                      type="button"
                      onClick={() => setConfirmation(false)}
                    >
                      Cancel
                    </Button>{" "}
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-500"
                    >
                      Confirm
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="newPatient">New patient</Label>
                  <Switch id="newPatient" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="events">Events</Label>
                  <Switch id="events" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="scheduleChanges">Schedule changes</Label>
                  <Switch id="scheduleChanges" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="researchResults">Research results</Label>
                  <Switch id="researchResults" />
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </main>
  );
};

export default GetSettingsForm;
