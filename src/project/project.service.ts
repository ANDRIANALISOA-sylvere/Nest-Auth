import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getAllProject() {
    return this.prisma.project.findMany({
      include: {
        User: true,
      },
    });
  }

  async getProjectById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        User: true,
      },
    });

    if (!project) {
      throw new BadRequestException('project not found');
    }

    return project;
  }
  async createProject(data: { name: string; userId: number }) {
    const user = await this.userService.getUserById(data.userId);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        User: {
          connect: {
            id: data.userId,
          },
        },
      },
      include: {
        User: true,
      },
    });

    return project;
  }

  async updateTask(id: number, data: { name: string }) {
    const project = await this.getProjectById(id);

    return this.prisma.project.update({
      where: { id: project.id },
      data: {
        name: data.name,
      },
      include: {
        User: true,
      },
    });
  }
  async deleteProject(id: number) {
    const project = await this.getProjectById(id);
    return this.prisma.project.delete({
      where: { id: Number(project.id) },
      include: {
        User: true,
      },
    });
  }
}
