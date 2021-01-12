class ConfigReader:

    def __init__(self, env):
        self.environment = self._get_environment(env)

    def _get_environment(self, env):
        if env == 'uat':
            return '.env.uat'
        elif env == 'production':
            return '.env.prod'
        else:
            return '.env.dev'

    def _get_env_dictionary(self):
        rows = []
        t_dict = {}

        passthru = [ rows.append(row.replace('\n','')) for row in open('./' + self.environment) ]

        for row in rows:
            row_ary = row.split('=')
            t_dict[row_ary[0]] = row_ary[1]

        return t_dict

    def read(self):
        return self._get_env_dictionary()