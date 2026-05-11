import CompanyRepositories from '../repositories/company-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const listCompanies = async (_req, res, _next) => {
  const companies = await CompanyRepositories.getCompanies();

  return response(res, 200, 'Companies listed', { companies });
};

export const viewCompanyDetail = async (req, res, next) => {
  const { id } = req.params;

  const company = await CompanyRepositories.getCompanyById(id);

  if (!company) {
    return next(new NotFoundError('Company not found'));
  }

  return response(res, 200, 'Company found', company);
};

export const registerCompany = async (req, res, next) => {
  const { name, location, description } = req.validated;

  const companyId = await CompanyRepositories.createCompany({
    name,
    location,
    description
  });

  if (!companyId) {
    return next(new InvariantError('Error while trying to create company'));
  }

  return response(res, 201, 'Company created successfully', companyId);
};

export const editCompanyDetail = async (req, res, next) => {
  const { id } = req.params;

  const companyExist = await CompanyRepositories.verifyCompanyExist(id);

  if (!companyExist) {
    return next(new NotFoundError('Company not found'));
  }

  const { name, location, description } = req.validated;
  const result = await CompanyRepositories.updateCompany({
    id,
    name,
    location,
    description
  });

  if (!result) {
    return next(new InvariantError('Error while trying to update company'));
  }

  return response(res, 200, 'Company updated successfully');
};

export const removeCompany = async (req, res, next) => {
  const { id } = req.params;

  const companyExist = await CompanyRepositories.verifyCompanyExist(id);

  if (!companyExist) {
    return next(new NotFoundError('Company not found'));
  }

  const result = await CompanyRepositories.deleteCompany(id);

  if (!result) {
    return next(new InvariantError('Error while trying to delete company'));
  }

  return response(res, 200, 'Company deleted successfully');
};
