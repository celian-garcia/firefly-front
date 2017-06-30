import {Component, OnInit, ViewContainerRef, Input} from '@angular/core';
import {TaskService} from '../api-firefly/task.service';
import {Task} from '../api-firefly/data/Task';
import {Modal} from 'angular2-modal/plugins/bootstrap/modal';
import {overlayConfigFactory} from 'angular2-modal';
import {TaskModalComponent} from './task-modal.component';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {ModuleService} from '../api-firefly/module.service';
import {ViewType} from '../toolbar/data/ViewType';

@Component({
    selector: 'app-tasks-overview',
    providers: [TaskService, ModuleService],
    templateUrl: './tasks-overview.component.html',
    styleUrls: ['./tasks-overview.component.css']
})
export class TasksOverviewComponent implements OnInit {

    errorMessage: string;
    tasks: Task[];

    @Input() view: ViewType;

    constructor(vcRef: ViewContainerRef, public modal: Modal, private taskService: TaskService) {
        this.modal.overlay.defaultViewContainer = vcRef;
        console.log(this.view);
    }

    ngOnInit() {
        this.refreshTasksList();
    }

    refreshTasksList() {
        this.taskService.getTasks()
            .subscribe(
                tasks => this.tasks = tasks,
                error => this.errorMessage = <any>error);
    }

    onClick() {
        return this.modal.open(TaskModalComponent, overlayConfigFactory({num1: 2, num2: 3}, BSModalContext))
            .then((dialog) => {
                    dialog.result.then(result => {
                        this.tasks.push(result);
                    }).catch((err) => {
                        alert(err);
                    });
                }
            );
    }

    viewTypeName(view: ViewType): string {
        return view === ViewType.LIST ? 'line' : 'card';
    }

}
