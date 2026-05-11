import JobRepositories from '../repositories/job-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const listJobs = async (req, res, _next) => {
  const { title, 'company-name': companyName } = req.validated;

  const jobs = await JobRepositories.getJobs({ title, companyName });

  return response(res, 200, 'Jobs listed', { jobs });
};

export const viewJobDetail = async (req, res, next) => {
  const { id } = req.params;

  const job = await JobRepositories.getJobById(id);

  if (!job) {
    return next(new NotFoundError('Job not found'));
  }

  return response(res, 200, 'Job found', job);
};

export const listJobsFromCompany = async (req, res, next) => {
  const { companyId } = req.params;

  const jobs = await JobRepositories.getJobsFromCompany(companyId);

  if (!jobs) {
    return next(new NotFoundError('Company not found'));
  }

  return response(res, 200, 'Jobs listed', { jobs });
};

export const listJobsFromCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const jobs = await JobRepositories.getJobsFromCategory(categoryId);

  if (!jobs) {
    return next(new NotFoundError('Company Not Found'));
  }

  return response(res, 200, 'Jobs listed', { jobs });
};

export const registerJob = async (req, res, next) => {
  const { id: userId } = req.user;
  const id = await JobRepositories.createJob(userId, req.validated);

  if (!id) {
    return next(new InvariantError('Error while trying to add new job'));
  }

  return response(res, 201, 'Job added successfully', id);
};

export const editJobDetail = async (req, res, next) => {
  const { id } = req.params;

  const jobExist = await JobRepositories.verifyJobExist(id);

  if (!jobExist) {
    return next(new NotFoundError('Job not found'));
  }

  const jobId = await JobRepositories.updateJob(id, req.validated);

  if (!jobId) {
    return next(new InvariantError('Error while trying to edit job detail'));
  }

  return response(res, 200, 'Job edited successfully');
};

export const removeJob = async (req, res, next) => {
  const { id } = req.params;

  const jobExist = await JobRepositories.verifyJobExist(id);

  if (!jobExist) {
    return next(new NotFoundError('Job not found'));
  }

  const jobId = await JobRepositories.deleteJob(id);

  if (!jobId) {
    return next(new InvariantError('Error while trying to delete job'));
  }

  return response(res, 200, 'Job deleted successfully');
};
