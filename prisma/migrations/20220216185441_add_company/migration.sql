-- CreateEnum
CREATE TYPE "Company" AS ENUM ('COKE', 'PEPSI');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company" "Company" NOT NULL DEFAULT E'COKE';
