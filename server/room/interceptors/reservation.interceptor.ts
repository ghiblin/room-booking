import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { getSession } from "next-auth/react";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ReservationDTO } from "../dtos/reservation.dto";

export type ReservationWithPermission = ReservationDTO & { canDelete: boolean };

@Injectable()
export class ReservationInterceptor
  implements
    NestInterceptor<
      ReservationDTO | ReservationDTO[],
      ReservationWithPermission | ReservationWithPermission[]
    >
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler<ReservationDTO | ReservationDTO[]>
  ): Promise<
    Observable<ReservationWithPermission | ReservationWithPermission[]>
  > {
    const req = context.switchToHttp().getRequest();
    const { user } = await getSession({ req });

    return next.handle().pipe(
      map((reservations) => {
        // Check if it's an array
        if (Array.isArray(reservations)) {
          return reservations.map((reservation) => ({
            ...reservation,
            canDelete: user?.email === reservation.user?.email,
          }));
        }
        return {
          ...reservations,
          canDelete: user?.email === reservations.user?.email,
        };
      })
    );
  }
}
