import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_STORAGE_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_POSTS_COLLECTION_ID,
  APPWRITE_ARTICLES_COLLECTION_ID
} from "@env";

export const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  platform: "com.devidk.atelie",
  projectId: APPWRITE_PROJECT_ID,
  storageId: APPWRITE_STORAGE_ID,
  databaseId: APPWRITE_DATABASE_ID,
  userCollectionId: APPWRITE_USER_COLLECTION_ID,
  postsCollectionId: APPWRITE_POSTS_COLLECTION_ID,
  articlesCollectionId: APPWRITE_ARTICLES_COLLECTION_ID
};

// Criação de uma instância do cliente Appwrite
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

// Criação de referências para as principais entidades do Appwrite
const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Função para criar um novo usuário
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
  
    if (!newAccount) throw Error;
  
    // Gera uma URL de avatar inicial usando as iniciais do usuário
    const avatarUrl = avatars.getInitials(username);
  
    await signIn(email, password);
  
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
  
    return newUser;
  } catch (error) {
    throw { message: error.message, code: error.code };
  }
}
  
// Função para fazer login de usuário
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para obter a conta do usuário atual
export async function getAccount() {
  try {
    const currentAccount = await account.get();
  
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para obter os dados do usuário atual
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;
  
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
  
    if (!currentUser) throw Error;
  
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
  
// Função para fazer logout do usuário
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
  
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para fazer upload de um arquivo
export async function uploadFile(file, type) {
  if (!file) return;
  
  // Extrai o tipo MIME do arquivo e mantém o restante das propriedades
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest }; // Cria um objeto asset com o tipo e as outras propriedades do arquivo
  
  try {
    // Faz o upload do arquivo para o storage do Appwrite
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
  
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para obter a URL de visualização de um arquivo
export async function getFilePreview(fileId, type) {
  let fileUrl;
  
  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId, // ID do arquivo
        2000,   // Largura máxima da imagem
        2000,   // Altura máxima da imagem
        "top",  // Posição do corte
        100     // Qualidade da imagem
      );
    } else {
      throw new Error("Invalid file type");
    }
  
    if (!fileUrl) throw Error;
  
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para criar uma nova postagem
export async function createPost(form) {
  try {
    // Faz o upload da imagem de miniatura
    const [thumbnailUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
    ]);
  
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        description: form.description,
        creator: form.userId, 
      }
    );
  
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Função para obter todas as postagens
export async function getAllPosts() {
  try {
    // Obtém todos os documentos de postagens do banco de dados, ordenados pela data de criação em ordem descrescente
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt")]
    );
  
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para obter as postagens de um usuário específico
export async function getUserPosts(userId) {
  try {
    // Obtém todos os documentos de postagens do banco de dados, filtrados pelo ID do usuário e ordenados pela data de criação em ordem descrescente
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );
  
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Função para obter todos os artigos
export async function getAllArticles(queries = []) {
  try {
    const defaultQueries = [Query.orderDesc("$createdAt")];
    const finalQueries = [...queries, ...defaultQueries];

    const articles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.articlesCollectionId,
      finalQueries
    );

    return articles.documents;
  } catch (error) {
    throw new Error(error);
  }
}
  
// Função para pesquisar postagens por uma string de consulta
// Pesquisar por uma string em específico requer a criação de um index 'fulltext' (AppWrite)
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("title", query)]
    );
  
    if (!posts) throw new Error("Something went wrong");
  
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Função para deletar um post
export async function deletePost(postId, userId) {
  try {
    // Primeiro, verifica se o post existe e se pertence ao usuário
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    // Verifica se o criador do post é um objeto e tem a propriedade $id
    const creatorId = post.creator.$id || post.creator;

    // Se o post não pertence ao usuário que está tentando deletar, lança um erro
    if (creatorId !== userId) {
      throw new Error("Unauthorized: You can only delete your own posts");
    }

    // Se houver uma thumbnail, deleta o arquivo do storage
    if (post.thumbnail) {
      // Extrai o ID do arquivo da URL da thumbnail
      const fileId = post.thumbnail.split("/files/")[1].split("/")[0];
      await storage.deleteFile(
        appwriteConfig.storageId,
        fileId
      );
    }

    // Deleta o documento do post
    const status = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    return status;
  } catch (error) {
    console.error("Delete Post Error:", error);
    throw new Error(error.message);
  }
}