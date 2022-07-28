import { Client, Account, Models, Functions, Databases } from "appwrite";
import { useState, useEffect } from "react";

export const useAppwrite = () => {
  const [client, setClient] = useState<null | Client>(null);
  const [account, setAccount] = useState<null | Account>(null);
  const [sessions, setSessions] = useState<null | Models.SessionList>(null);
  const [user, setUser] = useState<null | Models.User<any>>(null);
  const [functions, setFunctions] = useState<null | Functions>(null);
  const [databases, setDatabases] = useState<null | Databases>(null);
  const [jwt, setJwt] = useState<string | undefined>();

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_END_POINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const auth0BaseURL = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL;

  if (!endpoint || !projectId || !auth0BaseURL) {
    //Break build to force env variable addition.
    throw "Missing required env variables";
  }

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

  useEffect(() => {
    if (user && drsAccount) {
      getJwt();
    }
  }, [user]);
  const getJwt = async () => {
    const res = await createJWT();
    setJwt(res?.jwt);
  };

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
      const sessions = await account.getSessions();
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
      const wnd = window.open(`${auth0BaseURL}/v2/logout`);
      setTimeout(() => {
        wnd?.close();
      }, 1000);
    } catch (error) {
      throw error;
    }
  };

  const createJWT = async () => {
    if (!account) return null;
    try {
      return await account.createJWT();
    } catch (error) {
      throw error;
    }
  };

  const drsAccount = {
    deleteSessions,
    createSession,
    jwt,
  };

  /*
   * Functions
   */

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

  const drsFunctions = {
    deleteSessions,
    createSession,
    // createExecution,
  };

  return { user, drsAccount, drsFunctions };
};
