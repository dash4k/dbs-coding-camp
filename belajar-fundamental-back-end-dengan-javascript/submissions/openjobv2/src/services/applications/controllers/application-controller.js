import ApplicationRepositories from '../repositories/application-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import EmailService from '../producers/email-service.js';

export const registerApplication = async (req, res, next) => {
  const { user_id: userId, job_id: jobId, status } = req.validated;

  try {
    const application = await ApplicationRepositories.createApplication({ userId, jobId, status });

    const message = {
      applicationId: application.id,
      jobId: application.job_id,
    };
    await EmailService.sendMessage('user:application', JSON.stringify(message));

    return response(res, 201, 'Application registered successfully', application);
  } catch (error) {
    console.error(error);
    return next(new InvariantError('Error while trying to register application'));
  }
};

export const listApplications = async (_req, res, _next) => {
  const applications = await ApplicationRepositories.getApplications();
  return response(res, 200, 'Applications listed', { applications });
};

export const viewApplicationDetails = async (req, res, next) => {
  const { id } = req.params;

  const { application, fromCache } = await ApplicationRepositories.getApplicationById(id);

  if (!application) {
    return next(new NotFoundError('Application not found'));
  }

  res.setHeader('X-Data-Source', fromCache ? 'cache' : 'database');

  return response(res, 200, 'Application found', application);
};

export const listApplicationsFromUser = async (req, res, _next) => {
  const { userId: id } = req.params;

  const { applications, fromCache } = await ApplicationRepositories.getApplicationsByUser(id);

  res.setHeader('X-Data-Source', fromCache ? 'cache' : 'database');

  return response(res, 200, 'Applications listed', { applications });
};

export const listApplicationsFromJob = async (req, res, _next) => {
  const { jobId: id } = req.params;

  const { applications, fromCache } = await ApplicationRepositories.getApplicationsByJob(id);

  res.setHeader('X-Data-Source', fromCache ? 'cache' : 'database');

  return response(res, 200, 'Applications listed', { applications });
};

export const editApplicationDetails = async (req, res, next) => {
  const { id } = req.params;

  const applicationExist = await ApplicationRepositories.verifyApplicationExist(id);

  if (!applicationExist) {
    return next(new NotFoundError('Application not found'));
  }

  const { status } = req.validated;

  const success = await ApplicationRepositories.updateApplication({ id, status });

  if (!success) {
    return next(new InvariantError('Error while trying to edit application details'));
  }

  return response(res, 200, 'Application edited successfully');
};

export const removeApplication = async (req, res, next) => {
  const { id } = req.params;

  const applicationExist = await ApplicationRepositories.verifyApplicationExist(id);

  if (!applicationExist) {
    return next(new NotFoundError('Application not found'));
  }

  const success = await ApplicationRepositories.deleteApplication(id);

  if (!success) {
    return next(new InvariantError('Error while trying to remove application'));
  }

  return response(res, 200, 'Application removed successfully');
};
