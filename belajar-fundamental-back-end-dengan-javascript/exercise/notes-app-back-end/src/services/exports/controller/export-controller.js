import response from '../../../utils/response.js';
import ExportService from '../producers/export-service.js';

export const exportNotes = async (req, res, _next) => {
  const { targetEmail } = req.validated;

  const message = {
    userId: req.user.id,
    targetEmail,
  };

  await ExportService.sendMessage('export:notes', JSON.stringify(message));
  return response(res, 201, 'Permintaan Anda dalam antrean');
};
