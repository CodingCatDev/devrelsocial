import { Client, Account, Models, Functions, Databases } from "appwrite";
import { useState, useEffect } from "react";

export const useAppwrite = () => {
  const [client, setClient] = useState<null | Client>(null);
  const [account, setAccount] = useState<null | Account>(null);
  const [sessions, setSessions] = useState<null | Models.SessionList>(null);
  const [user, setUser] = useState<null | Models.User<any>>(null);
  const [functions, setFunctions] = useState<null | Functions>(null);
  const [databases, setDatabases] = useState<null | Databases>(null);

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_END_POINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  // Initialize Client
  useEffect(() => {
    if (!endpoint || !projectId) {
      console.error("Missing env variables for Appwrite");
      return;
    }
    if (!client) {
      const n = new Client();
      n.setEndpoint(endpoint).setProject(projectId);
      setClient(n);
    }
  }, []);

  // Initialize services
  useEffect(() => {
    if (!client) return;
    if (!account) {
      setAccount(new Account(client));
    }
    if (!functions) {
      setFunctions(new Functions(client));
    }
    if (!databases) {
      setDatabases(new Databases(client, "default"));
    }
  }, [client]);

  /*
   * Account Session Tracking
   */

  const createSession = async () => {
    if (!account) return;
    try {
      await account.createOAuth2Session(
        "auth0",
        `${location.origin}/`,
        `${location.origin}/?login=failed`
      );
    } catch (error) {
      throw error;
    }
  };

  const getSessions = async (account: Account) => {
    try {
      console.log("getting sessions");
      const sessions = await account.getSessions();
      console.log("sessions", sessions);
      setSessions(sessions);
    } catch (error) {
      //failed to get sessoion go login
      // createSession();
    }
  };
  useEffect(() => {
    if (!account) return;
    getSessions(account);
  }, [account]);

  useEffect(() => {
    if (!sessions) return;
    get();
  }, [sessions]);

  const get = async () => {
    if (!account) return null;
    try {
      setUser(await account.get());
    } catch (error) {
      throw error;
    }
  };

  const deleteSessions = async () => {
    if (!account) return null;
    try {
      await account.deleteSessions();
      setUser(null);
      setSessions(null);
      const wnd = window.open("https://codingcatdev.us.auth0.com/v2/logout");
      setTimeout(() => {
        wnd?.close();
      }, 1000);
    } catch (error) {
      throw error;
    }
  };

  const createExecution = async (
    functionId: string,
    data?: string | undefined,
    async?: boolean | undefined
  ) => {
    if (!functions) return null;
    try {
      const resp = await functions.createExecution(functionId, data, async);
      console.log(resp);
    } catch (error) {
      throw error;
    }
  };

  return { user, deleteSessions, createSession, createExecution };
};
