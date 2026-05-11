import UploadRepositories from '../repositories/upload-repositories.js';
import response from '../../../utils/response.js';
import ClientError from '../../../exceptions/client-error.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import AuthorizationError from '../../../exceptions/authorization-error.js';
import { deleteFromDisk } from '../storage/storage-config.js';

export const uploadDocuments = async (req, res, next) => {
  if (!req.file) {
    return next(new ClientError('File is required'));
  }

  const document = await UploadRepositories.createDocument(req.user.id, req.file);

  if (!document) {
    return next(new InvariantError('Error while trying to upload document'));
  }

  return response(res, 201, 'Document uploaded successfully', document);
};

export const listDocuments = async (req, res, _next) => {
  const documents = await UploadRepositories.getDocuments();
  return response(res, 200, 'Documents listed', { documents });
};

export const viewDocumentDetails = async (req, res, next) => {
  const { id } = req.params;

  const document = await UploadRepositories.getDocument(id);
  if (!document) {
    return next(new NotFoundError('Document not found'));
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${document.filename}"`);
  res.status(200);
  return res.sendFile(document.path);
};

export const removeDocument = async (req, res, next) => {
  const { id: documentId } = req.params;
  const { id: userId } = req.user;

  const validDocument = await UploadRepositories.verifyDocumentExist(documentId);
  if (!validDocument) {
    return next(new NotFoundError('Document not found'));
  }

  const validUser = await UploadRepositories.verifyDocumentOwner(documentId, userId);
  if (!validUser) {
    return next(new AuthorizationError('Invalid permission to delete this document'));
  }

  const filePath = await UploadRepositories.deleteDocument(documentId);

  await deleteFromDisk(filePath);

  return response(res, 200, 'Document deleted successfully');
};
