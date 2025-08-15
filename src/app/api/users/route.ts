import { connectDB } from '@/lib/mongodb';
import { createResponse } from '@/helper/responseHelper';
import { HttpStatusCode } from 'axios';
import User from '@/models/User';
import { getUserPayload } from '@/ultis/getUserPayload';
import { ROLES } from '@/constants/roles';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { error, payload } = getUserPayload(req);
    if (error) return error;

    if (payload.role !== ROLES.ADMIN) {
      return createResponse(HttpStatusCode.Forbidden, 'permission_denied');
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('perPage') || '10', 10);

    const skip = (page - 1) * perPage;

    const [users, total] = await Promise.all([
      User.find({ role: ROLES.USER })
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage),
      User.countDocuments({ role: ROLES.USER }),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return createResponse(HttpStatusCode.Ok, 'success', {
      users,
      pagination: {
        total,
        page,
        perPage,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    return createResponse(HttpStatusCode.InternalServerError, 'server_error');
  }
}
