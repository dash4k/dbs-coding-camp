import ApplicationRepositories from '../repositories/application-repositories.js';
// import UserRepositories from '../../users/repositories/user-repositories.js';
// import JobRepositories from '../../jobs/repositories/job-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const registerApplication = async (req, res, next) => {
  const { user_id: userId, job_id: jobId, status } = req.validated;

  const id = await ApplicationRepositories.createApplication({ userId, jobId, status });

  if (!id) {
    return next(new InvariantError('Error while trying to register new application'));
  }

  return response(res, 201, 'Application registered successfully', id);
};

export const listApplications = async (_req, res, _next) => {
  const applications = await ApplicationRepositories.getApplications();
  return response(res, 200, 'Applications listed', { applications });
};

export const viewApplicationDetails = async (req, res, next) => {
  const { id } = req.params;

  const application = await ApplicationRepositories.getApplicationById(id);

  if (!application) {
    return next(new NotFoundError('Application not found'));
  }

  return response(res, 200, 'Application found', application);
};

export const listApplicationsFromUser = async (req, res, _next) => {
  const { userId: id } = req.params;

  //   const userExist = await UserRepositories.verifyUserExist(id);

  //   if (!userExist) {
  //     return next(new NotFoundError('User not found'));
  //   }

  const applications = await ApplicationRepositories.getApplicationsByUser(id);
  return response(res, 200, 'Applications listed', { applications });
};

export const listApplicationsFromJob = async (req, res, _next) => {
  const { jobId: id } = req.params;

  //   const jobExist = await JobRepositories.verifyJobExist(id);

  //   if (!jobExist) {
  //     return next(new NotFoundError('Job not found'));
  //   }

  const applications = await ApplicationRepositories.getApplicationsByJob(id);
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
